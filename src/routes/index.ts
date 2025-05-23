import { Router } from "express";
import postRouter from "../routes/post";
const router = Router();

router.use("/post", postRouter);
router.use("/", (req, res, next) => {
  res.status(300).redirect("/post");
});
export default router;
