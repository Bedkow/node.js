import { Request } from "express";
import { UserModel } from "./models/user.model.ts";

export interface AuthenticatedRequest extends Request {
  user: UserModel;
}