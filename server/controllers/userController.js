const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const midtransClient = require("midtrans-client");
const { v4: uuidv4 } = require('uuid');

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // ? cek user input email dan password
      if (!email) throw { name: "emailIsRequired" };
      if (!password) throw { name: "passwordIsRequired" };

      // ? cek user ada apa ga di db
      let user = await User.findOne({ where: { email } });
      if (!user) throw { name: "invalidEmailOrPassword" };

      // ? cek password user
      let isValid = comparePassword(password, user.password);
      if (!isValid) throw { name: "invalidEmailOrPassword" };

      // ? generate jwt
      const token = generateToken(user.id);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client();
      const { googleToken } = req.body;
      // ? cek googleToken ada?
      if (!googleToken) throw { name: "missingGoogleToken" };

      // ? verify token dari google
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      // ? cek user ada apa ga di db
      let [user] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          username: payload.name,
          imageUrl: payload.picture,
          password: "default",
        },
      });
      // ? generate jwt
      const token = generateJwt(user.id);
      res.status(200).json({
        token,
        email: payload.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async donation(req, res, next) {
    try {
      const { amount } = req.body;
      if (!amount) throw { name: "amountIsRequired" };
      
      const orderId = `DNT-${uuidv4()}`;

      // Create Snap API instance
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
      };

      const transaction = await snap.createTransaction(parameter)
      let transactionToken = transaction.token

      res.status(200).json({
        transactionToken
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
