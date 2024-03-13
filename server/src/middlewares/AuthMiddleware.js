import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  if (req.headers[`auth`] === undefined) {
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access Denied"));
  }

  const token = req.headers["auth"];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);

    req.userId = decoded.userId;

    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token")
    );
  }
};

export default AuthMiddleware;
