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
        isAccessToken: req.cookies.accessToken,
        userSession: req.session.user,
        isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
    });
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
    try {
        const params = req.params as RequestParams;
        const postId = params.postId;
        const body = req.body as RequestBody;
        const _id = body._id;
        const title = body.title;
        const content = body.content;
        const isCreator = req.session.user._id;

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
                isAccessToken: req.cookies.accessToken,
                userSession: req.session.user,
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
            });
        }
        const postCreator = await PostSchema.findById(postId).populate("creator", "_id");
        if (!postCreator) {
            return res.status(404).render("error/404", {
                statusCode: "404",
                errorMessage: "Post not found",
                isAccessToken: req.cookies.accessToken,
                userSession: req.session.user,
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
            });
        }
        if (isCreator.toString() !== postCreator.creator._id.toString()) {
            return res.status(403).render("error/404", {
                countError: errors.array().length,
                paramId: postId,
                oldInput: {
                    title: title,
                    content: content,
                },
                docTitle: "403",
                statusCode: "403",
                errorMessage: "You do not have permission to edit this post",
                isAccessToken: req.cookies.accessToken,
                userSession: req.session.user,
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
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
        res.status(303).redirect("/post/my-posts");
    } catch (err: any) {
        err.statusCode = err.statusCode || 500;
        console.log(err.statusCode);
        next(err);
    }
}
export const updatePostControllers = { getUpdatePost, updatePost };
