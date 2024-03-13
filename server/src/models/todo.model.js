import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  desc: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
