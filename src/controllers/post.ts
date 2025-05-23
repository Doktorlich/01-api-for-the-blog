import { Request, Response, NextFunction } from "express";
import PostSchema from "../models/post";
interface Post {
    id: string;
    text: string;
}
// interface Post {
//   _id: string;
//   text: string;
//   title: string;
//   content: string;
//   creator: string;
// }
type RequestBody = { text: string };
type RequestParams = { postId: string };

let postList: Post[] = [];

function getPosts(req: Request, res: Response, next: NextFunction) {
    PostSchema.find();
    res.status(200).render("post/index");
    // res.status(200).json({ postList: postList });
}

async function createPost(req: Request, res: Response, next: NextFunction) {
    const body = req.body as RequestBody;
    const newPost = { id: new Date().toISOString(), text: body.text };
    postList.push(newPost);
    res.status(201).json({ message: "Created post", postList: newPost });
}
async function updatePost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    const body = req.body as RequestBody;
    const postIndex = postList.findIndex(post => post.id === postId);
    postList[postIndex] = { id: postList[postIndex].id, text: body.text };
    res.status(200).json({ message: "Updated post" });
}
async function deletePost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    postList = postList.filter(post => post.id !== postId);
    res.status(200).json({ message: "Deleted post", postList: postList });
}

async function getPost(req: Request, res: Response, next: NextFunction) {
    const params = req.params as RequestParams;
    const postId = params.postId;
    const postIndex = postList.findIndex(post => post.id === postId);

    res.status(200).json({ postList: postList[postIndex] });
}

export const postControllers = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPost,
};
