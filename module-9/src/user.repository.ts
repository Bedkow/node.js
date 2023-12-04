import { dbContext } from "./dataAccess.repository.ts";
import { UserModel } from "./models/user.model.ts";

const { userModel } = dbContext;

export async function createUser(user: UserModel): Promise<UserModel> {
  const newUser = new userModel(user);
  return newUser.save();
}

export async function findUserByEmail(email: string): Promise<UserModel | null> {
  return userModel.findOne({ email: email }).exec();
}

export async function findUserById(id: string): Promise<UserModel | null> {
  return userModel.findById(id).exec();
}