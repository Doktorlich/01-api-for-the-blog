import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import { validationResult } from "express-validator";
import { RequestBody, RequestParams } from "../../types/post.types";

async function getUpdatePost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const body = req.body as RequestBody;
    const postId = params.postId;

    const post = await PostSchema.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    const title = post.title;
    const content = post.content;
    res.status(200).render("post/update-post", {
        path: "/post/" + postId + "/update",
        paramId: postId,
        title: title,
        content: content,
    });
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    const body = req.body as RequestBody;
    const _id = body._id;
    const title = body.title;
    const content = body.content;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render("post/update-post", {
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            countError: errors.array().length,
            paramId: postId,
            oldInput: {
                title: title,
                content: content,
            },
        });
    }

    await PostSchema.updateOne(
        { _id: postId },
        {
            $set: {
                _id: postId,
                title: title,
                content: content,
            },
        },
    );
    console.log("updated post");
    console.log(updatePost);
    res.status(300).redirect("/");
}
export const updatePostControllers = { getUpdatePost, updatePost };
