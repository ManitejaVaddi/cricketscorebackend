import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "player" }, 
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
