import { NextFunction, Request, Response } from "express";
import { RequestBody } from "../../types/post.types";
import UserSchema from "../../models/user";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

async function getProfile(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("user/profile", {
        path: "/profile",
        isAccessToken: req.cookies.accessToken,
        userSession: req.session.user,
        isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
    });
}

async function updateName(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const name = body.name;
    const sessionUserId = req.session.user._id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(404).render("user/profile", {
            path: "/profile",
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            countError: errors.array().length,

            isAccessToken: req.cookies.accessToken,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    try {
        const user = await UserSchema.findById(sessionUserId);
        if (!user) {
            return res.status(500).render("error/500", {
                statusCode: "500",
                errorMessage: "Due to an error on the server, the user was not found.",
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
            });
        }
        await UserSchema.updateOne(
            { _id: sessionUserId },
            {
                $set: {
                    name: name,
                },
            },
        );
        const userUpdated = await UserSchema.findById(sessionUserId);
        req.session.user = userUpdated;
        console.log("User name updated");
        res.status(200).redirect("/profile");
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    }
}
async function updateEmail(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const email = body.email;
    const sessionUserId = req.session.user._id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(404).render("user/profile", {
            path: "/profile",
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            countError: errors.array().length,

            isAccessToken: req.cookies.accessToken,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    try {
        const user = await UserSchema.findById(sessionUserId);
        if (!user) {
            return res.status(500).render("error/500", {
                statusCode: "500",
                errorMessage: "Due to an error on the server, the user was not found.",
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
            });
        }
        await UserSchema.updateOne(
            { _id: sessionUserId },
            {
                $set: {
                    email: email,
                },
            },
        );
        const userUpdated = await UserSchema.findById(sessionUserId);
        req.session.user = userUpdated;
        console.log("User email updated");
        res.status(200).redirect("/profile");
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    }
}
async function updatePassword(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const password = body.password;
    const confirmPassword = body.confirmPassword;
    const sessionUserId = req.session.user._id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(404).render("user/profile", {
            path: "/profile",
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            countError: errors.array().length,

            isAccessToken: req.cookies.accessToken,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    try {
        const user = await UserSchema.findById(sessionUserId);
        if (!user) {
            return res.status(500).render("error/500", {
                statusCode: "500",
                errorMessage: "Due to an error on the server, the user was not found.",
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await UserSchema.updateOne(
            { _id: sessionUserId },
            {
                $set: {
                    password: hashedPassword,
                },
            },
        );
        const userUpdated = await UserSchema.findById(sessionUserId);
        req.session.user = userUpdated;
        console.log("User password updated");
        res.status(200).redirect("/profile");
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    }
}

export const profileControllers = {
    getProfile,
    updateName,
    updateEmail,
    updatePassword,
};
