import { createPostControllers } from "./post/create-post";
import { updatePostControllers } from "./post/update-post";
import { readPostControllers } from "./post/read-post";
import { deletePostControllers } from "./post/delete-post";
import { getLoginControllers } from "./auth/login";
import { getSignInControllers } from "./auth/sign-in";

export const postControllers = {
    getPosts: readPostControllers.getPosts,
    getPost: readPostControllers.getPost,
    createPost: createPostControllers.createPost,
    getCreatePost: createPostControllers.getCreatePost,
    getUpdatePost: updatePostControllers.getUpdatePost,
    updatePost: updatePostControllers.updatePost,
    deletePost: deletePostControllers.deletePost,
};
export const authControllers = {
    getLogin: getLoginControllers.getLogin,
    getSignIn: getSignInControllers.getSignIn,
    postSignIn: getSignInControllers.postSignIn,
};
