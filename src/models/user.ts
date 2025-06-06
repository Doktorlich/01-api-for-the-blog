import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
});

export default model("User", userSchema);
