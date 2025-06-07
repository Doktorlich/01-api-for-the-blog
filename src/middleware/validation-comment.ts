import { body } from "express-validator";

const validatorComment = {
    content: [
        body("content")
            .trim()
            // .withMessage("A comment cannot be empty")
            .isLength({ min: 1, max: 256 })
            .withMessage("The length of the comment should not exceed 256 characters"),
    ],
};

export default validatorComment;
