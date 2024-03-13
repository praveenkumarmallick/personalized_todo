import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import apiRoute, { apiProtected } from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

const app = express();

const PORT = 8000;

// Dotenv
dotenv.config();

// Creating Database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database Connected Successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

// Middlesares
app.use(express.json());

app.use("/api", apiRoute);
app.use("/api", AuthMiddleware, apiProtected);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
