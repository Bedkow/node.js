import { EntityRepository } from "@mikro-orm/core";
import { CartEntity } from "../entities/cart.entity.ts";

export class CartsRepository extends EntityRepository<CartEntity> {
  createCart(cartData: any) {
    throw new Error("Method not implemented.");
  }
  updateCart(cartData: any) {
    throw new Error("Method not implemented.");
  }
  async getAllCarts(): Promise<CartEntity[] | []> {
    return await this.findAll();
  }
  async findCartByUserID(userID: number): Promise<CartEntity | null> {
    return await this.findOne({ user: { id: userID } });
  }
}
