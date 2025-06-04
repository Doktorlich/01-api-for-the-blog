import { NextFunction, Request, Response } from "express";
import { RequestBody } from "../../types/post.types";
import { validationResult } from "express-validator";
import UserSchema from "../../models/user";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import { StatusError } from "../../types/error.types";

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
        // console.log(user);
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

        const refreshToken = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            `${process.env.REFRESH_TOKEN_SECRET}`,
            {
                expiresIn: "30d",
            },
        );
        const accessToken = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            `${process.env.ACCESS_TOKEN_SECRET}`,
            {
                expiresIn: "30m",
            },
        );
        req.session.isLoggedIn = true;
        req.session.user = user;

        req.session.refreshToken = refreshToken;
        req.session.accessToken = accessToken;

        req.session.save(err => {
            if (err) {
                console.error("Ошибка сохранения сессии:", err);
                return next(err);
            }
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 30,
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 30 * 60 * 1000,
            });
            res.status(200).redirect("/");
        });

        console.log("User successfully logged in");
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next(err);
    }
}

async function postLogout(req: Request, res: Response, next: NextFunction) {
    try {
        req.session.destroy(err => {
            if (err) {
                const error = new Error(err) as StatusError;
                error.statusCode = 500;
                throw error;
            }
        });
        if (req.session) {
            const error = new Error("The session was not deleted") as StatusError;
            error.statusCode = 500;
            throw error;
        }
        res.clearCookie("connect.sid", {
            // Это стандартное имя куки для express-session
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        console.log("The user is logged out");
        res.status(200).redirect("/");
    } catch (err: any) {
        if (!err.statusCode) {
            return res
                .status(500)
                .render("error/500", { statusCode: err.statusCode, errorMessage: err.message });
        }
        console.log(err);
        return res.status(500).render("error/500", { errorMessage: err.message });
    }
}
export const loginControllers = {
    getLogin,
    postLogin,
    postLogout,
};
