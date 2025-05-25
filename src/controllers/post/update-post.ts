import { NextFunction, Request, Response } from "express";
import PostSchema from "../../models/post";

type RequestBody = { _id: string; text: string; title: string; content: string; creator: string };
type RequestParams = { postId: string };

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
        path: "/post/" + postId,
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

    await PostSchema.updateOne(
        { _id: postId },
        {
            $set: {
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
