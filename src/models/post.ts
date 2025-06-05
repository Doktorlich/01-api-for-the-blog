import { Schema, model } from "mongoose";
import UserModel from "./user";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true },
);

postSchema.post("findOneAndDelete", async document => {
    if (document) {
        await UserModel.updateOne({ _id: document.creator }, { $pull: { posts: document._id } });
    }
});

export default model("Post", postSchema);
