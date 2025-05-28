import { Router } from "express";
import postRouter from "../routes/post";
import { controllersStatusError } from "../controllers/errors/errors";
const router = Router();
router.use("/post", postRouter);
router.get("/", (req, res, next) => {
    res.status(300).redirect("/post");
});

router.use(controllersStatusError.getStatusError500);
router.use(controllersStatusError.getStatusError404);

export default router;
