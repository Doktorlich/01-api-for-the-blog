import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import { RequestParams } from "../../types/post.types";

async function deletePost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    await PostSchema.findOneAndDelete({ _id: postId });
    res.status(200).redirect("/post");
}
export const deletePostControllers = {
    deletePost,
};
