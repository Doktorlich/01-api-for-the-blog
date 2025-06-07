import { Schema, model } from "mongoose";
import UserModel from "./user";
import PostModel from "./post";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);
commentSchema.post("findOneAndDelete", async comment => {
    if (comment) {
        await UserModel.updateOne({ _id: comment.creator }, { $pull: { comments: comment._id } });
    }
});
commentSchema.post("findOneAndDelete", async comment => {
    if (comment) {
        await PostModel.updateOne({ _id: comment.post }, { $pull: { comments: comment._id } });
    }
});
export default model("Comment", commentSchema);
