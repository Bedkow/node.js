import { EntityRepository } from "@mikro-orm/core";
import { CartEntity } from "../entities/cart.entity.ts";

export class CartsRepository extends EntityRepository<CartEntity> {
	async getAllCarts(): Promise<CartEntity[] | []> {
		return await this.findAll();
	}
	async findCartByUserID(userID: number): Promise<CartEntity | null> {
		return await this.findOne({ user: { id: userID } });
	}
}
