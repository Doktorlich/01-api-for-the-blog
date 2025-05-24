import { Router } from "express";
import { postControllers } from "../controllers/post";
const router = Router();
//ГЛАВНОЕ ПРАВИЛО: Сначала идут статически роуты и только потом динамические , иначе будет ошибка рендеринга
router.get("/", postControllers.getPosts);
router.get("/create-post", postControllers.getCreatePost);
router.post("/create-post", postControllers.createPost);
// router.put("/:postId", postControllers.updatePost);
// router.delete("/:postId", postControllers.deletePost);
// //п
// router.get("/:postId", postControllers.getPost);

export default router;
