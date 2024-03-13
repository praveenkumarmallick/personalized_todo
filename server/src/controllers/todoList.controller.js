import User from "../models/user.model.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";

export const GetTodos = async (req, res) => {
  try {
    const list = await User.findById(req.useId)
      .select("-password")
      .populate("todos")
      .exec();

    return res.json(jsonGenerate(StatusCode.SUCCESS, "All Todo List", list));
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};
