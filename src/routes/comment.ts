import { RequestHandler, Router } from "express";

import { commentControllers } from "../controllers";
import isAuth from "../middleware/is-auth";

import validatorComment from "../middleware/validation-comment";

const router = Router();

router.post(
    "/create-comment",
    isAuth,
    validatorComment.content,
    commentControllers.createComment as RequestHandler,
);

export default router;
