import { Router } from "express";
import { RequestHandler } from "express";
import { authControllers } from "../controllers";

import validatorAuth from "../middleware/validation-auth";

const router = Router();

router.get("/login", authControllers.getLogin);
// router.post("/login");
//
router.get("/sign-in", authControllers.getSignIn);
router.post(
    "/sign-in",
    validatorAuth.email,
    validatorAuth.name,
    validatorAuth.password,
    validatorAuth.confirmPassword,
    authControllers.postSignIn,
);

export default router;
