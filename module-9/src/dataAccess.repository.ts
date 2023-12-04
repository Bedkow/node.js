import mongoose, { ConnectOptions } from 'mongoose';
import { OrderModel, OrderSchema } from './models/order.model.ts';
import { UserModel, UserSchema } from './models/user.model.ts';
import { ProductModel, ProductSchema } from './models/product.model.ts';
import { CartModel, CartSchema } from './models/cart.model.ts';

const MONGO_URL = 'mongodb://mongoadmin:password123@localhost:27017/mongoDB';

const connectionOptions: ConnectOptions = {} as ConnectOptions;

mongoose.connect(MONGO_URL, connectionOptions);

const orderModel = mongoose.model<OrderModel>('Order', OrderSchema);
const userModel = mongoose.model<UserModel>('User', UserSchema);
const productModel = mongoose.model<ProductModel>('Product', ProductSchema);
const cartModel = mongoose.model<CartModel>('Cart', CartSchema);

export const dbContext = {
  orderModel,
  userModel,
  productModel,
  cartModel,
};