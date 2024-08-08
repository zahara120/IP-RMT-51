const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    // ? user kirim token ga? (udah login apa belom)
    if (!accessToken) throw { name: "unauthenticated" };

    // ? token valid ga?
    const [bearer, token] = accessToken.split(" ");
    if (bearer !== "Bearer") throw { name: "unauthenticated" };

    // ? siapa yang lagi login?
    const payload = verifyToken(token);

    // ? user nya ada apa engga di db
    const user = await User.findByPk(payload);
    if (!user) throw { name: "unauthenticated" };

    // todo simpen data user
    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
