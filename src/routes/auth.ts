import { Router } from "express";
import { RequestHandler } from "express";
import { authControllers } from "../controllers";

import { validatorAuth } from "../middleware/validation-auth";

import isAuth from "../middleware/is-auth";

const [validationLogin, validatorSignIn] = [
    validatorAuth.validationLogin,
    validatorAuth.validatorSignIn,
];

const router = Router();

router.get("/login", authControllers.getLogin);
router.post("/login", validationLogin.email, validationLogin.password, authControllers.postLogin);
//
router.get("/sign-in", authControllers.getSignIn);
router.post(
    "/sign-in",
    validatorSignIn.email,
    validatorSignIn.name,
    validatorSignIn.password,
    validatorSignIn.confirmPassword,
    authControllers.postSignIn,
);

router.post("/log-out", authControllers.postLogout);

export default router;
