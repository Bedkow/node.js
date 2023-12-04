import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./models/user.model.ts";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(user: UserModel): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET_KEY);
}