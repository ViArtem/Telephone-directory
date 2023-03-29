import { Schema, model } from "mongoose";

// Scheme for saving registered users
const shemaRegist = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  refresh: { type: String },
  customId: { type: String },
  avatar: {
    type: String,
    required: true,
  },
});

export default model("Users", shemaRegist);
