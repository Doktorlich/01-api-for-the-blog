import { NextFunction, Request, Response } from "express";

function getSignIn(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("auth/sign-in", {
        docTitle: "Sign in",
        path: "/sign-in",
    });
}

export const getSignInControllers = {
    getSignIn,
};
