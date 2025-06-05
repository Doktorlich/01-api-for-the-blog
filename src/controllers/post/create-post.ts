import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import UserSchema from "../../models/user";
import { validationResult } from "express-validator";
import { Error } from "mongoose";
import { StatusError } from "../../types/error.types";
import { RequestBody } from "../../types/post.types";

async function getCreatePost(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("post/create-post", {
        path: "/create-post",
        isAccessToken: req.cookies.accessToken,
        userSession: req.session.user,
        isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
    });
}

async function createPost(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const title = body.title;
    const content = body.content;
    const creator = req.session.user;

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
            isAccessToken: req.cookies.accessToken,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    }
    try {
        const newPost = new PostSchema({
            title: title,
            content: content,
            creator: creator._id,
            nameCreator: creator.name,
        });
        console.log(newPost);
        await newPost.save();

        const user = await UserSchema.findById(creator._id);
        if (!user) {
            res.status(404);
            return next();
        }
        const userPosts = user.posts;
        userPosts.push(newPost._id);
        console.log("user populate", user);
        await user.save();
        return res.status(201).redirect("/");
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    }
}
export const createPostControllers = { getCreatePost, createPost };
