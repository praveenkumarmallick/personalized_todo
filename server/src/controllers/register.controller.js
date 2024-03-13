import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import User from "../models/user.model.js";

const Register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Validation Error",
          errors.mapped()
        )
      );
    }

    const { name, username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userExists = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExists) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or email already exists"
        )
      );
    }

    const result = await User.create({
      name,
      email,
      username,
      password: hashPassword,
    });

    const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET_KEY);

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Registration Successful", {
        userId: result._id,
        token: token,
      })
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
      );
  }
};

export default Register;
