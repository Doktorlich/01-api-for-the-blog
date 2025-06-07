import { NextFunction, Request, Response } from "express";
import { RequestBody, RequestParams } from "../../types/post.types";
import UserSchema from "../../models/user";
import PostSchema from "../../models/post";
import CommentSchema from "../../models/comment";
import { validationResult } from "express-validator";

async function createComment(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;

    const userId = req.session.user._id;
    const postId = body.postId;
    const content = body.content;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render("post/" + postId, {
            path: "post/" + postId,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            countError: errors.array().length,

            isAccessToken: req.cookies.accessToken,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    try {
        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(422).render("error/404", {
                statusCode: "422",
                errorMessage:
                    "The server understands the type of user in the request body and the query syntax is correct, but the server was unable to process the instructions for that content.",
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
            });
        }
        const post = await PostSchema.findById(postId);
        if (!post) {
            return res.status(422).render("error/404", {
                statusCode: "422",
                errorMessage:
                    "The server understands the type of post in the request body and the query syntax is correct, but the server was unable to process the instructions for that content",
                isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
            });
        }
        const newComment = new CommentSchema({
            content: content,
            creator: user._id,
            post: post._id,
        });
        console.log(newComment);
        await newComment.save();

        user.comments.push(newComment._id);
        await user.save();

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).redirect("/post/" + postId);
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        return next(err);
    }
}

async function changeComment(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const commentId = body.commentId;
    const postId = body.paramId;
    const content = body.content;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render("post/" + postId, {
            path: "post/" + postId,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            countError: errors.array().length,

            isAccessToken: req.cookies.accessToken,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    const post = await PostSchema.findById(postId);
    console.log(post?._id);
    if (!post) {
        res.status(422).render("error/404", {
            statusCode: "422",
            errorMessage:
                "The server understands the type of post in the request body and the query syntax is correct, but the server was unable to process the instructions for that content.",
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    try {
        await CommentSchema.updateOne(
            { _id: commentId },
            {
                $set: {
                    content: content,
                },
            },
        );
        res.status(303).redirect("/post/" + post?._id);
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        return next(err);
    }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const commentId = body.commentId;
    const postId = body.paramId;
    const post = await PostSchema.findById(postId);
    console.log(post?._id);
    if (!post) {
        res.status(422).render("error/404", {
            statusCode: "422",
            errorMessage:
                "The server understands the type of post in the request body and the query syntax is correct, but the server was unable to process the instructions for that content.",
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    try {
        await CommentSchema.findByIdAndDelete({ _id: commentId });
        res.status(303).redirect("/post/" + post?._id);
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        return next(err);
    }
}
export const commentController = {
    createComment,
    changeComment,
    deleteComment,
};
