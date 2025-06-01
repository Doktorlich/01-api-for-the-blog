import { NextFunction, Request, Response } from "express";
import { RequestBody } from "../../types/post.types";
import UserSchema from "../../models/user";
import { Error } from "mongoose";
import { StatusError } from "../../types/error.types";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

async function getSignIn(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("auth/sign-in", {
        docTitle: "Sign in",
        path: "/sign-in",
    });
}

async function postSignIn(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body as RequestBody;
        const email = body.email;
        const name = body.name || `User ${new Date().toISOString()}`;
        const password = body.password;
        const confirmPassword = body.confirmPassword;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).render("auth/sign-in", {
                path: "/sign-in",
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array(),
                countError: errors.array().length,
                oldInput: {
                    email: email,
                    name: name,
                    password: password,
                    confirmPassword: confirmPassword,
                },
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserSchema({ email: email, name: name, password: hashedPassword });
        console.log(newUser);
        await newUser.save();
        res.status(201).redirect("/login");
    } catch (err: any) {
        const error = new Error(err) as StatusError;
        console.error(err);
        error.statusCode = 500;
        return next(error);
    }
}
export const signInControllers = {
    getSignIn,
    postSignIn,
};
