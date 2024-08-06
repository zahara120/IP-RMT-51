const errorHandler = (error, req, res, next) => {
  let status;
  let message;
  
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors.map((el) => el.message);
      break;
    case "emailIsRequired":
      status = 400;
      message = "email is required";
      break;
    case "passwordIsRequired":
      status = 400;
      message = "password is required";
      break;
    case "unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "missingGoogleToken":
      status = 401;
      message = "Login failed";
      break;
    case "invalidEmailOrPassword":
      status = 401;
      message = "error invalid email or password";
      break;
    case "forbidden":
      status = 403;
      message = "Unauthorized";
      break;
    case "notFound":
      status = 404;
      message = "error not found";
      break;
    default:
      status = 500;
      message = "Server error";
      break;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
