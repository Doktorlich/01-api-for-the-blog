import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routeIndex from "./routes/index";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routeIndex);

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(process.env.PORT, (error) => {
      if (error) {
        return error;
      }
      console.log("Server successfully started");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB database", error);
  });
