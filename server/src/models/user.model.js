import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 32,
  },
  username: {
    type: String,
    min: 6,
    max: 32,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    min: 6,
    max: 32,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
