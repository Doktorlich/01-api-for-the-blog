import { body } from "express-validator";
import UserSchema from "../models/user";
const validatorSignIn = {
    email: [
        body("email")
            .isEmail()

            .withMessage("Please enter a valid email.")
            .normalizeEmail()
            .custom(async (value, { req }) => {
                const userEmail = await UserSchema.findOne({ email: value });
                if (userEmail) {
                    throw new Error("E-mail exists already, please pick a different one.");
                }
                return true;
            })
            .trim(),
    ],
    name: [body("name").optional()],
    password: [
        body(
            "password",
            "Please enter a password with only numbers and text and at least 5 characters.",
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
    ],
    confirmPassword: [
        body("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password have to match!");
                }
                return true;
            })
            .trim(),
    ],
};
const validationLogin = {
    email: [
        body("email")
            .isEmail()
            .isLength({ min: 5 })
            .withMessage("Please enter a valid email.")
            .normalizeEmail()
            .trim(),
    ],
    password: [
        body(
            "password",
            "Please enter a password with only numbers and text and at least 5 characters.",
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
    ],
};
export const validatorAuth = {
    validatorSignIn,
    validationLogin,
};
