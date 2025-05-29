import { Router } from "express";
import { RequestHandler } from "express";
import { postControllers } from "../controllers";
import validatorPost from "../middleware/validator-post";
const router = Router();

//ГЛАВНОЕ ПРАВИЛО: Сначала идут статически роуты и только потом динамические , иначе будет ошибка рендеринга
// /post/...
router.get("/create-post", postControllers.getCreatePost as RequestHandler);
router.post("/create-post", validatorPost.content, validatorPost.title, postControllers.createPost as RequestHandler);

// /update
router.get("/:postId/update", postControllers.getUpdatePost as RequestHandler);
// //вместо PUT
router.post("/:postId/update", validatorPost.content, validatorPost.title, postControllers.updatePost as RequestHandler);
// //вместо DELETE
router.post("/:postId/delete", postControllers.deletePost as RequestHandler);

router.get("/:postId", postControllers.getPost as RequestHandler);

router.get("/", postControllers.getPosts as RequestHandler);

export default router;
