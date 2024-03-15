import express from "express";
import Register from "../controllers/register.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import Login from "../controllers/login.controller.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { createTodo } from "../controllers/todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/todoList.controller.js";
import { MarkTodo } from "../controllers/markTodo.controller.js";
import { RemoveTodo } from "../controllers/removeTodo.controller.js";

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

apiProtected.post(
  "/markTodo",
  [check("todo_id", "Todo Id is required").exists()],
  MarkTodo
);

apiProtected.delete(
  "/deleteTodo",
  [check("todo_id", "Todo Id is required").exists()],
  RemoveTodo
);

apiProtected.get("/todolist", GetTodos);

export default apiRoute;
