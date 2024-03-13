import express from "express";
import Register from "../controllers/register.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import Login from "../controllers/login.controller.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { createTodo } from "../controllers/todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/todoList.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

// Protected Routes
apiProtected.post(
  "/createTodo",
  [check("desc", "Todo description is required").exists()],
  createTodo
);

apiProtected.get("/todolist", GetTodos);

export default apiRoute;
