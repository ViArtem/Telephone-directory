import { Schema, model } from "mongoose";

// Scheme for saving contacts in the database
const shem = new Schema({
  fullName: { type: String, required: true },
  number: { type: String, required: true },
  owner: { type: String, required: true },
  id: { type: String, required: true },
  avatar: {
    type: String,
  },
});

export default model("Contact", shem);
