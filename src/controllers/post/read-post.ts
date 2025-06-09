import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import UserSchema from "../../models/post";
import CommentSchema from "../../models/comment";
import { RequestBody, RequestParams, RequestQuery } from "../../types/post.types";
import { Error } from "mongoose";
import { StatusError } from "../../types/error.types";

import { body, validationResult } from "express-validator";

interface IComment {
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query as RequestQuery;
        const params = req.params as RequestParams;
        const body = req.body as RequestBody;
        const POST_PER_PAGE: number = 2;
        const page: number = +query.page || 1;

        const search: string | undefined = query.search?.trim();
        const searchInput = query.search?.trim();
        const isCreator = req.session.user?._id.toString();

        console.log(searchInput);
        if (isNaN(page) || page < 1) {
            const error = new Error("Invalid page number") as StatusError;
            error.statusCode = 400;
            return next(error);
        }
        const searchCondition = search
            ? { title: { $regex: search, $options: "i" } } // 'i' - регистронезависимый поиск
            : {};
        const totalPages: number = await PostSchema.find(searchCondition).countDocuments();
        const totalPosts = Math.ceil(totalPages / POST_PER_PAGE);

        console.log("searchCondition", searchCondition);
        const posts = await PostSchema.find(searchCondition)
            .populate("creator", "_id email name")
            .populate({
                path: "comments",
                select: "_id content createdAt updatedAt",
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE);
        console.log("POSTS", posts.length);
        if (page > totalPages && totalPages > 0) {
            const error = new Error("Could not find post.") as StatusError;
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).render("post/index", {
            path: "/post",
            posts: posts,
            page: page,
            cdPost: +totalPages,
            currentPage: page,
            POST_PER_PAGE: +POST_PER_PAGE,
            hasNextPage: POST_PER_PAGE * page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: totalPosts,
            isCreator: isCreator,
            oldSearch: searchInput,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    } catch (err: any) {
        err.statusCode = err.statusCode || 500;

        console.log(err, err.statusCode);
        next(err);
    }
}

async function getPost(req: Request, res: Response, next: NextFunction) {
    const query = req.query as RequestQuery;
    const params = req.params as RequestParams;

    const postId = params.postId;
    const isCreator = req.session.user?._id.toString();

    try {
        const COMMENTS_PER_PAGE: number = 2;
        const page: number = +query.page || 1;
        if (isNaN(page) || page < 1) {
            const error = new Error("Invalid page number") as StatusError;
            error.statusCode = 400;
            return next(error);
        }

        const post = await PostSchema.findById(postId)
            .populate("creator", "_id email name")
            .populate({
                path: "comments",
                select: "_id content createdAt updatedAt",
                options: {
                    sort: { createdAt: -1 },
                    skip: (page - 1) * COMMENTS_PER_PAGE,
                    limit: COMMENTS_PER_PAGE,
                },
                populate: {
                    path: "creator",
                    select: "_id email name ",
                },
            });
        const commentsCount = await PostSchema.findById(postId).then(
            post => post?.comments.length || 0,
        );
        const totalPages = Math.ceil(commentsCount / COMMENTS_PER_PAGE);

        if (page > totalPages && totalPages > 0) {
            const error = new Error("Could not find comments.") as StatusError;
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).render("post/full-post", {
            path: "/post/" + postId,
            comments: post?.comments,
            cdComments: commentsCount, // общее количество комментариев
            currentPage: page,
            COMMENTS_PER_PAGE: COMMENTS_PER_PAGE,
            hasNextPage: COMMENTS_PER_PAGE * page < commentsCount,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: totalPages, // общее количество страниц

            paramId: postId,
            post: post,
            countComments: post?.comments.length,

            userSession: req.session.user,
            isCreator: isCreator,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    } catch (err: any) {
        err.statusCode = err.statusCode || 500;

        console.log(err, err.statusCode);
        next(err);
    }
}
async function getMyPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query as RequestQuery;
        const params = req.params as RequestParams;
        const body = req.body as RequestBody;
        const POST_PER_PAGE: number = 2;
        const page: number = +query.page || 1;

        const search: string | undefined = query.search?.trim();
        const searchInput = query.search?.trim();
        const isCreator = req.session.user?._id.toString();

        console.log(searchInput);
        if (isNaN(page) || page < 1) {
            const error = new Error("Invalid page number") as StatusError;
            error.statusCode = 400;
            return next(error);
        }
        const searchCondition = search
            ? { title: { $regex: search, $options: "i" } } // 'i' - регистронезависимый поиск
            : {};
        const totalPages: number = await PostSchema.find({
            ...searchCondition,
            creator: isCreator,
        }).countDocuments();
        const totalPosts = Math.ceil(totalPages / POST_PER_PAGE);

        console.log("searchCondition", searchCondition);

        const posts = await PostSchema.find({
            ...searchCondition,
            creator: isCreator,
        })
            .populate("creator", "_id email name")
            .populate({
                path: "comments",
                select: "_id content createdAt updatedAt",
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE);
        console.log("POSTS", posts);
        if (page > totalPages && totalPages > 0) {
            const error = new Error("Could not find post.") as StatusError;
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).render("post/my-posts", {
            path: "/post/my-posts",
            posts: posts,
            page: page,
            cdPost: +totalPages,
            currentPage: page,
            POST_PER_PAGE: +POST_PER_PAGE,
            hasNextPage: POST_PER_PAGE * page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: totalPosts,
            isCreator: isCreator,
            oldSearch: searchInput,
            userSession: req.session.user,
            isLoggedIn: req.cookies.accessToken || req.cookies.refreshToken,
        });
    } catch (err: any) {
        err.statusCode = err.statusCode || 500;

        console.log(err, err.statusCode);
        next(err);
    }
}

export const readPostControllers = {
    getPosts,
    getPost,
    getMyPosts,
};
