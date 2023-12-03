import { dbContext } from './dataAccess.repository.ts';

interface UpdateCreateCartResponse {
  code: number;
  message: string;
}

export async function updateCreateCart(cartData: any): Promise<UpdateCreateCartResponse> {
  const existingCart = await dbContext.cartModel.findOne({ user: cartData.user });

  if (existingCart) {
    await dbContext.cartModel.updateOne({ user: cartData.user }, cartData);
    return { code: 200, message: 'Cart updated successfully.' };
  } else {
    await dbContext.cartModel.create(cartData);
    return { code: 201, message: 'Cart created successfully.' };
  }
}