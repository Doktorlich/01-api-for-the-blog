import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";

type RequestBody = { _id: string; text: string; title: string; content: string; creator: string };
type RequestParams = { postId: string };

async function deletePost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    await PostSchema.deleteOne({ _id: postId });
    res.status(200).redirect("/post");
}
export const deletePostControllers = {
    deletePost,
};
