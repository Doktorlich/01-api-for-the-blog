import { NextFunction, Request, Response } from "express";
import { RequestBody } from "../../types/post.types";
import { validationResult } from "express-validator";
import UserSchema from "../../models/user";
import bcrypt from "bcryptjs";
import { SessionData } from "express-session";

async function getLogin(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("auth/login", {
        docTitle: "Login",
        path: "/login",
        isLoggedIn: req.session.isLoggedIn,
    });
}

async function postLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body as RequestBody;
        const email = body.email;
        const password = body.password;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).render("auth/login", {
                path: "/login",
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array(),
                countError: errors.array().length,
                isLoggedIn: req.session.isLoggedIn,
                oldInput: {
                    email: email,
                },
            });
        }
        const user = await UserSchema.findOne({ email: email });
        console.log(user);
        if (!user) {
            return res.status(422).render("auth/login", {
                docTitle: "Login",
                path: "/login",
                customErrorMessage: "Such a user is not yet registered ",

                validationErrors: errors.array(),
                countError: errors.array().length,
                oldInput: { email: email },
            });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(422).render("auth/login", {
                docTitle: "Login",
                path: "/login",
                customErrorMessage: "Invalid password.",
                validationErrors: errors.array(),
                countError: errors.array().length,
                oldInput: { email: email },
            });
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(error => {
            if (error) {
                console.log(error);
                return;
            }
        });
        res.redirect("/");
        console.log("User successfully logged in");
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        return next(err);
    }
}

async function postLogout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log("The user is logged out");
    res.status(301).redirect("/");
}
export const loginControllers = {
    getLogin,
    postLogin,
    postLogout,
};
