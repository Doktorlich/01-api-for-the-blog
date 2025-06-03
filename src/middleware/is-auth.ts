import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req.cookies.accessToken;
        const decoded = jwt.verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`) as JwtPayload;
        req.userId = decoded.userId;
        return next();
    } catch (err: any) {
        console.error("JWT Error:", err.name);
        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError" || // <-- если токена нет вообще
            err.name === "NotBeforeError"
        ) {
            return tryRefreshToken(req, res, next);
        }
        return res.status(401).redirect("/login");
    }
}

async function tryRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).redirect("/login");
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "10s" },
        );
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 10 * 1000, // 30 минут
        });
        req.userId = decoded.userId;
        req.newAccessToken = newAccessToken;
        console.log("newAccessToken");
        next();
    } catch (err) {
        console.error("Refresh Token Error:", err);
        return res
            .clearCookie("refreshToken")
            .clearCookie("accessToken")
            .status(401)
            .redirect("/login");
    }
}
export default isAuth;
