import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";

type RequestBody = { _id: string; text: string; title: string; content: string; creator: string };
type RequestParams = { postId: string };

async function getPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await PostSchema.find();
    res.status(200).render("post/index", {
        path: "/post",
        posts: posts,
    });
}

async function getPost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    const post = await PostSchema.findById(postId);
    res.status(200).render("post/full-post", {
        path: "/post/" + postId,
        paramId: postId,
        post: post,
    });
}

export const readPostControllers = {
    getPosts,
    getPost,
};
