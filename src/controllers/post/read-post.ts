import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import { RequestParams, RequestQuery } from "../../types/post.types";
import { Error } from "mongoose";
import { StatusError } from "../../types/error.types";

async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query as RequestQuery;
        const params = req.params as RequestParams;
        const POST_PER_PAGE: number = 2;
        const page: number = +query.page || 1;
        const isCreator = req.session.user?._id.toString();

        if (isNaN(page) || page < 1) {
            const error = new Error("Invalid page number") as StatusError;
            error.statusCode = 400;
            return next(error);
        }

        const totalPages: number = await PostSchema.find().countDocuments();
        const totalPosts = Math.ceil(totalPages / POST_PER_PAGE);

        const posts = await PostSchema.find()
            .populate("creator", "_id email name")
            .skip((page - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE);
        if (page > totalPages && totalPages > 0) {
            const error = new Error("Could not find post.") as StatusError;
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).render("post/index", {
            path: "/post",
            posts: posts,
            gage: page,
            cdPost: +totalPages,
            currentPage: page,
            POST_PER_PAGE: +POST_PER_PAGE,
            hasNextPage: POST_PER_PAGE * page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: totalPosts,
            isCreator: isCreator,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (err: any) {
        err.statusCode = err.statusCode || 500;

        console.log(err, err.statusCode);
        next(err);
    }
}

async function getPost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    const post = await PostSchema.findById(postId);

    res.status(200).render("post/full-post", {
        path: "/post/" + postId,
        paramId: postId,
        post: post,
        isLoggedIn: req.session.isLoggedIn,
    });
}

export const readPostControllers = {
    getPosts,
    getPost,
};
