import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";

export const RemoveTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "todo id is required",
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.findOneAndDelete({
      userId: req.userId,
      _id: req.body.todo_id,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { todos: req.body.todo_id } }
      );

      return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo deleted", null));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};
