import { NextFunction, Request, Response } from "express";

async function createComment(req: Request, res: Response, next: NextFunction) {
    next();
}

export const commentController = {
    createComment,
};
