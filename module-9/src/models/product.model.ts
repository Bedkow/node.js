import { Schema, Document, Types } from 'mongoose';
import { CartModel } from './cart.model.ts';
import { OrderModel } from './order.model.ts';

export interface ProductModel extends Document {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  cart: Types.ObjectId | CartModel;
  order: Types.ObjectId | OrderModel;
}

const ProductSchema = new Schema<ProductModel>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: Number, required: true },
  cart: { type: Types.ObjectId, ref: 'Cart', required: false },
  order: { type: Types.ObjectId, ref: 'Order', required: false },
});

export { ProductSchema };