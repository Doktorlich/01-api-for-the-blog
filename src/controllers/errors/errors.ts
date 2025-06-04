import { NextFunction, Request, Response } from "express";
import { StatusError } from "../../types/error.types";

function getStatusError404(req: Request, res: Response, next: NextFunction) {
    res.status(404).render("error/404", {
        docTitle: "Error 404",
        path: "/404",
        statusCode: "",
        errorMessage: "",
        isAccessToken: req.cookies.accessToken,
        userSession: req.session.user,
        isLoggedIn: req.cookies.accessToken,
    });
}
function getStatusError500(error: StatusError, req: Request, res: Response, next: NextFunction) {
    res.status(error.statusCode || 500).render("error/500", {
        path: "/500",
        docTitle: "Error 500",
        statusCode: "",
        errorMessage: "",
        isAccessToken: req.cookies.accessToken,
        userSession: req.session.user,
        isLoggedIn: req.cookies.accessToken,
    });
}

export const controllersStatusError = {
    getStatusError404,
    getStatusError500,
};
