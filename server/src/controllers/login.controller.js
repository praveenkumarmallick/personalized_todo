import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "username or password is incorrect"
        )
      );
    }

    const verified = bcrypt.compareSync(password, user.password);

    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "username or password is incorrect"
        )
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY
    );
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successfull", {
        userId: user._id,
        token: token,
      })
    );
  }

  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation Error",
      errors.mapped()
    )
  );
};

export default Login;
