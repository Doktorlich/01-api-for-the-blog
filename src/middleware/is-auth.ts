import { NextFunction, Request, Response } from "express";

function isAuth(req: Request, res: Response, next: NextFunction) {
    const isAuth = req.session.isLoggedIn;
    if (!isAuth) {
        return res.redirect("/login");
    }
    next();
}
export default isAuth;
