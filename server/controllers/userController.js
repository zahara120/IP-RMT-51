const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

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
}
module.exports = UserController;
