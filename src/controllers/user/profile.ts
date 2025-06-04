import { NextFunction, Request, Response } from "express";

function getProfile(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("user/profile", {
        path: "/profile",
        isAccessToken: req.cookies.accessToken,
        userSession: req.session.user,
        isLoggedIn: req.cookies.accessToken,
    });
}

export const profileControllers = {
    getProfile,
};
