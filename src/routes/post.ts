import { Router } from "express";
import { postControllers } from "../controllers/post";
const router = Router();

router.get("/", postControllers.getPosts);
router.post("/", postControllers.createPost);
router.put("/:postId", postControllers.updatePost);
router.delete("/:postId", postControllers.deletePost);
//п
router.get("/:postId", postControllers.getPost);
export default router;
