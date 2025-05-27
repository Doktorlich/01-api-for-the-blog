import { NextFunction, Request, Response } from "express";

function getStatusError404(req: Request, res: Response, next: NextFunction) {
    res.status(404).render("error/404", { path: "/404" });
}
function getStatusError500(error: ErrorConstructor, req: Request, res: Response, next: NextFunction) {
    res.status(500).render("error/500", { path: "/500" });
}

export const controllersStatusError = {
    getStatusError404,
    getStatusError500,
};
