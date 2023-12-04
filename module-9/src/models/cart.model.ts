import { Schema, Document, Types } from 'mongoose';
import { UserModel } from './user.model.ts';
import { ProductModel } from './product.model.ts';

export interface CartModel extends Document {
  id: number;
  user: Types.ObjectId | UserModel;
  items: Types.DocumentArray<ProductModel>;
  createdAt: Date;
}

const CartSchema = new Schema<CartModel>({
  id: { type: Number, required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  items: [{ type: Types.ObjectId, ref: 'Product', required: true }],
  createdAt: { type: Date, default: Date.now },
});

export { CartSchema };