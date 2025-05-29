import { Router } from "express";
import { RequestHandler } from "express";
import { authControllers } from "../controllers";
import validatorPost from "../middleware/validator-post";

const router = Router();

router.get("/login", authControllers.getLogin);
// router.post("/login");
//
router.get("/sign-in", authControllers.getSignIn);
// router.post("/sign-in");

export default router;
