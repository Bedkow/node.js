import { Schema, Document, model } from "mongoose";

export interface UserModel extends Document {
  id: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export const UserSchema = new Schema<UserModel>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true }
});

export const userModel = model<UserModel>("User", UserSchema);