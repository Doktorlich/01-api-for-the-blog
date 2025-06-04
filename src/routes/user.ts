import { Router } from "express";
import { profileControllers } from "../controllers/user/profile";
import { userControllers } from "../controllers";

const router = Router();

router.get("/", userControllers.getProfile);

export default router;
