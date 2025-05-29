import { NextFunction, Request, Response } from "express";

function getLogin(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("auth/login", {
        docTitle: "Login",
        path: "/login",
    });
}

export const getLoginControllers = {
    getLogin,
};
