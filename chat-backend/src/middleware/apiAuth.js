import { errorResponse } from "../helpers";
import { User } from "../models";

const jwt = require("jsonwebtoken");

const apiAuth = async (req, res, next) => {
  if (req.path == "/login" || req.path == "/register") {
    return next();
  }
  if (!(req.headers && req.headers["authorization"])) {
    return errorResponse(req, res, "Token is not provided", 401);
  }
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.scope("withSecretColumns").findOne({
      where: { username: decoded.user.username },
    });
    if (!user) {
      return errorResponse(req, res, "User is not found in system", 401);
    }
    const reqUser = { ...user.get() };
    reqUser.userId = user.id;
    req.user = reqUser;
    return next();
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Incorrect token is provided, try re-login",
      401
    );
  }
};

export default apiAuth;
