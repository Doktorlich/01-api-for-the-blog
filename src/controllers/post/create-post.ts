import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";

type RequestBody = { _id: string; text: string; title: string; content: string; creator: string };
type RequestParams = { postId: string };

async function getCreatePost(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("post/create-post", {
        path: "/create-post",
    });
}

async function createPost(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const title = body.title;
    const content = body.content;
    const newPost = new PostSchema({
        title: title,
        content: content,
    });
    console.log(newPost);
    await newPost.save();
    res.status(201).redirect("/");
}
export const createPostControllers = { getCreatePost, createPost };
