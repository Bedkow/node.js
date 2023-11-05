import { EntityRepository } from "@mikro-orm/core";
import { CartEntity } from "../entities/cart.entity.ts";

export class CartsRepository extends EntityRepository<CartEntity> {
  async getAllCarts(): Promise<CartEntity[] | []> {
    return await this.findAll();
  }
}