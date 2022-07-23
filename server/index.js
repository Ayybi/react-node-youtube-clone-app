import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    sucess: false,
    status,
    message,
  });
});

app.listen(process.env.PORT || 3001, () => {
  connect();
  console.log(`Server is running on port 3001`);
});
