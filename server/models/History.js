import { Schema, model } from "mongoose";

// Scheme for saving actions in the database
const shemaHistory = new Schema({
  action: { type: String },
  time: { type: Number },
});

export default model("History", shemaHistory);
