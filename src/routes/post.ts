import { Router } from "express";
import { RequestHandler } from "express";
import { postControllers } from "../controllers";
import validatorPost from "../middleware/validator-post";
import isAuth from "../middleware/is-auth";
const router = Router();

//ГЛАВНОЕ ПРАВИЛО: Сначала идут статически роуты и только потом динамические , иначе будет ошибка рендеринга
// /post/...
router.get("/my-posts", isAuth, postControllers.getMyPosts as RequestHandler);

router.get("/create-post", isAuth, postControllers.getCreatePost as RequestHandler);
router.post(
    "/create-post",
    isAuth,
    validatorPost.content,
    validatorPost.title,
    postControllers.createPost as RequestHandler,
);

// /update
router.get("/:postId/update", isAuth, postControllers.getUpdatePost as RequestHandler);
// //вместо PUT
router.post(
    "/:postId/update",
    isAuth,
    validatorPost.content,
    validatorPost.title,
    postControllers.updatePost as RequestHandler,
);
// //вместо DELETE
router.post("/:postId/delete", isAuth, postControllers.deletePost as RequestHandler);
// просмотр постов
router.get("/:postId", postControllers.getPost as RequestHandler);

router.get("/", postControllers.getPosts as RequestHandler);

export default router;
