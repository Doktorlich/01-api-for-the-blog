export type RequestBody = {
    _id: string;
    text: string;
    title: string;
    content: string;
    creator: string;
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    postId: string;
};
export type RequestParams = { postId: string };
export type RequestQuery = { page: string };
