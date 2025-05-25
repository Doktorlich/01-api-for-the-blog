import { createPostControllers } from "./post/create-post";
import { updatePostControllers } from "./post/update-post";
import { readPostControllers } from "./post/read-post";
import { deletePostControllers } from "./post/delete-post";

export const postControllers = {
    getPosts: readPostControllers.getPosts,
    createPost: createPostControllers.createPost,
    getCreatePost: createPostControllers.getCreatePost,
    getUpdatePost: updatePostControllers.getUpdatePost,
    updatePost: updatePostControllers.updatePost,
    deletePost: deletePostControllers.deletePost,
};
