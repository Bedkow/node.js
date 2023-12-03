import { Schema, Document } from 'mongoose';

export interface UserModel extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserModel>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export { UserSchema };