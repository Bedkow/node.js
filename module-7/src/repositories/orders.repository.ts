import { EntityRepository } from "@mikro-orm/core";
import { OrderEntity } from "../entities/order.entity.ts";

export class OrdersRepository extends EntityRepository<OrderEntity> {
  async getAllOrders(): Promise<OrderEntity[] | []> {
    return await this.findAll();
  }
}