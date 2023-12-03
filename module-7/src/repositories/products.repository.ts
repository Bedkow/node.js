import { EntityRepository } from "@mikro-orm/core";
import { ProductEntity } from "../entities/product.entity.ts";

export class ProductsRepository extends EntityRepository<ProductEntity> {
  async getAllProducts(): Promise<ProductEntity[] | []> {
    return await this.findAll();
  }

  async findProductByID(id: number): Promise<ProductEntity | null> {
    return await this.findOne(id);
  }
}