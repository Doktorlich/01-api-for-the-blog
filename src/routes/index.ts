import { NextFunction, Request, Response, Router } from "express";
import postRouter from "../routes/post";
import userRouter from "../routes/user";
import authRouter from "../routes/auth";
import commentRouter from "../routes/comment";
import { controllersStatusError } from "../controllers/errors/errors";
import { StatusError } from "../types/error.types";
import isAuth from "../middleware/is-auth";
const router = Router();

router.use("/profile", userRouter);
router.use("/post/:postId", commentRouter);
router.use("/post", postRouter);
router.use("/", authRouter);
router.get("/", (req, res, next) => {
    res.status(300).redirect("/post");
});

router.use((err: StatusError, req: Request, res: Response, next: NextFunction) => {
    controllersStatusError.getStatusError500(err, req, res, next);
});
router.use(controllersStatusError.getStatusError404);

export default router;
