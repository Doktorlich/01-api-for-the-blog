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
router.post(
    "/change-comment",
    isAuth,
    validatorComment.content,
    commentControllers.changeComment as RequestHandler,
);
router.post("/delete-comment", isAuth, commentControllers.deleteComment as RequestHandler);
export default router;
