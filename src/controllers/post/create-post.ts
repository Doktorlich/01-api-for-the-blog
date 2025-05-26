import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import { validationResult } from "express-validator";

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render("post/create-post", {
            path: "/create-post",
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            countError: errors.array().length,
            oldInput: {
                title: title,
                content: content,
            },
        });
    }
    try {
        const newPost = new PostSchema({
            title: title,
            content: content,
        });
        console.log(newPost);
        await newPost.save();
        res.status(201).redirect("/");
    } catch (error) {}
}
export const createPostControllers = { getCreatePost, createPost };
