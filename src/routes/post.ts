import { Router } from "express";
import { RequestHandler } from "express";
import { postControllers } from "../controllers";
const router = Router();
//ГЛАВНОЕ ПРАВИЛО: Сначала идут статически роуты и только потом динамические , иначе будет ошибка рендеринга
// /post/...
router.get("/create-post", postControllers.getCreatePost);
router.post("/create-post", postControllers.createPost);

router.get("/:postId/update", postControllers.getUpdatePost as RequestHandler);
// вместо PUT
router.post("/:postId/update", postControllers.updatePost as RequestHandler);
// вместо DELETE
router.post("/:postId/delete", postControllers.deletePost);

router.get("/:postId", postControllers.getPost);

router.get("/", postControllers.getPosts);

export default router;
