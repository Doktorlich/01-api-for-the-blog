import "express-session";
import { UserDocument } from "../models/user";

declare module "express-session" {
    interface SessionData {
        isLoggedIn?: boolean;
        user?: UserDocument;
        accessToken?: string;

        refreshToken?: string;
    }
}
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            newAccessToken?: string;
        }
    }
}
