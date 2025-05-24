import { Request, Response, NextFunction } from "express";
import PostSchema from "../models/post";
// interface Post {
//     id: string;
//     text: string;
// }
interface Post {
    _id: string;
    text: string;
    title: string;
    content: string;
    creator: string;
}
type RequestBody = { _id: string; text: string; title: string; content: string; creator: string };
type RequestParams = { postId: string };

let postList: Post[] = [];

function getPosts(req: Request, res: Response, next: NextFunction) {
    // PostSchema.find();
    res.status(200).render("post/index", {
        path: "/post",
    });
}

async function getCreatePost(req: Request, res: Response, next: NextFunction) {
    res.status(200).render("post/create-post", {
        path: "/create-post",
    });
}

async function createPost(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;

    const title = body.title;
    const content = body.content;
    // const newPost = { title: title, content: content };
    const newPost = new PostSchema({
        title: title,
        content: content,
    });
    console.log(newPost);
    await newPost.save();
    res.status(201).redirect("/");
}
// async function updatePost(req: Request, res: Response, next: NextFunction) {
//     const params = req.params as RequestParams;
//     const postId = params.postId;
//     const body = req.body as RequestBody;
//     const postIndex = postList.findIndex(post => post.id === postId);
//     postList[postIndex] = { id: postList[postIndex].id, text: body.text };
//     res.status(200).json({ message: "Updated post" });
// }
// async function deletePost(req: Request, res: Response, next: NextFunction) {
//     const params = req.params as RequestParams;
//     const postId = params.postId;
//     postList = postList.filter(post => post.id !== postId);
//     res.status(200).json({ message: "Deleted post", postList: postList });
// }
//
// async function getPost(req: Request, res: Response, next: NextFunction) {
//     const params = req.params as RequestParams;
//     const postId = params.postId;
//     const postIndex = postList.findIndex(post => post.id === postId);
//
//     res.status(200).json({ postList: postList[postIndex] });
// }

export const postControllers = {
    getPosts,
    getCreatePost,
    createPost,
    // updatePost,
    // deletePost,
    // getPost,
};
