import { body } from "express-validator";

const validatorPost = {
    title: [
        body("title")
            .trim()
            .isLength({ min: 5, max: 50 })
            .withMessage("The title of the title should be between 5 and 50 characters"),
    ],
    content: [
        body("content")
            .trim()
            .isLength({ min: 5, max: 1024 })
            .withMessage("The content of the content field must be between 5 and 1024 characters"),
    ],
};

export default validatorPost;
