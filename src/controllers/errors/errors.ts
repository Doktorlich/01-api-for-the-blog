import { NextFunction, Request, Response } from "express";
import { StatusError } from "../../types/error.types";

function getStatusError404(req: Request, res: Response, next: NextFunction) {
    res.status(404).render("error/404", { docTitle: "Error 404", path: "/404" });
}
function getStatusError500(error: StatusError, req: Request, res: Response, next: NextFunction) {
    res.status(error.httpStatusCode || 500).render("error/500", { path: "/500" });
}

export const controllersStatusError = {
    getStatusError404,
    getStatusError500,
};
