import { createPostControllers } from "./post/create-post";
import { updatePostControllers } from "./post/update-post";
import { readPostControllers } from "./post/read-post";
import { deletePostControllers } from "./post/delete-post";
import { loginControllers } from "./auth/login";
import { signInControllers } from "./auth/sign-in";
import { profileControllers } from "./user/profile";

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
    getLogin: loginControllers.getLogin,
    postLogin: loginControllers.postLogin,
    postLogout: loginControllers.postLogout,
    getSignIn: signInControllers.getSignIn,
    postSignIn: signInControllers.postSignIn,
};

export const userControllers = {
    getProfile: profileControllers.getProfile,
};
