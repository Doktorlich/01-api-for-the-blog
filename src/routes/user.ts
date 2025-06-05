import { Router } from "express";
import { profileControllers } from "../controllers/user/profile";
import { userControllers } from "../controllers";
import isAuth from "../middleware/is-auth";
import validatorProfile from "../middleware/validation-profile";

const router = Router();

router.post("/update-name", isAuth, validatorProfile.name, userControllers.updateName);
router.post("/update-email", isAuth, validatorProfile.email, userControllers.updateEmail);
router.post(
    "/update-password",
    isAuth,
    validatorProfile.password,
    validatorProfile.confirmPassword,
    userControllers.updatePassword,
);
router.get("/", isAuth, userControllers.getProfile);

export default router;
