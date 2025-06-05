import { Router } from "express";

import { commentControllers } from "../controllers";
import isAuth from "../middleware/is-auth";

import validatorComment from "../middleware/validation-comment";

const router = Router();

router.post(
    "/:postId/create-comment",
    isAuth,
    validatorComment.content,
    commentControllers.createComment,
);

export default router;
