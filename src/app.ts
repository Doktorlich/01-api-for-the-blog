import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import routeIndex from "./routes/index";
import path from "path";
import sessionMiddleware from "./middleware/session.middleware";

import UserSchema from "./models/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(sessionMiddleware);

app.use(routeIndex);

mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        app.listen(process.env.PORT || 3000, error => {
            if (error) {
                return error;
            }
            console.log("Server successfully started");
        });
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB database", error);
    });
