import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import { RequestParams, RequestQuery } from "../../types/post.types";

async function getPosts(req: Request, res: Response, next: NextFunction) {
    const query = req.query as RequestQuery;
    const params = req.params as RequestParams;
    const POST_PER_PAGE: number = 2;
    const page: number = +query.page || 1;

    const cd: number = await PostSchema.find().countDocuments();
    const posts = await PostSchema.find()
        .skip((page - 1) * POST_PER_PAGE)
        .limit(POST_PER_PAGE);

    res.status(200).render("post/index", {
        path: "/post",
        posts: posts,
        cdPost: cd,
        currentPage: page,
        hasNextPage: POST_PER_PAGE * page < cd,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(cd / POST_PER_PAGE),
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
