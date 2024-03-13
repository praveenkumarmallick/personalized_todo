import { check } from "express-validator";

export const RegisterSchema = [
  check("name")
    .trim()
    .isAlpha()
    .withMessage("Name should contain Alphabets only"),

  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username should contain Alphanumeric characters only")
    .trim()
    .isLength({
      min: 6,
      max: 32,
    }),

  check("password", "password is required")
    .isLength({ min: 6, max: 100 })
    .trim(),

  check("email", "email is required").exists().isEmail(),
];
