import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Db is connected`);
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});