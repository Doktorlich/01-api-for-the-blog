import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";
import { RequestParams } from "../../types/post.types";

async function deletePost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;

    const isCreator = req.session.user._id;
    const postCreator = await PostSchema.findById(postId).populate("creator", "_id");
    if (!postCreator) {
        return res.status(404).render("error/404", {
            statusCode: "404",
            errorMessage: "Post not found",
            isLoggedIn: req.cookies.accessToken,
        });
    }
    if (isCreator.toString() !== postCreator.creator._id.toString()) {
        return res.status(403).render("error/404", {
            docTitle: "403",
            statusCode: "403",
            errorMessage: "You do not have permission to edit this post",
            isLoggedIn: req.cookies.accessToken,
        });
    }

    await PostSchema.findOneAndDelete({ _id: postId });
    res.status(200).redirect("/post");
}
export const deletePostControllers = {
    deletePost,
};
