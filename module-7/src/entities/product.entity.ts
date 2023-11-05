import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
} from "@mikro-orm/core";
import { CartEntity } from "./cart.entity.ts";
import { OrderEntity } from "./order.entity.ts"; // Import OrderEntity

@Entity({ tableName: "products" })
export class ProductEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  @Property()
  categoryId!: number;

  @ManyToOne(() => CartEntity)
  cart!: CartEntity;

  @ManyToOne(() => OrderEntity)
  order!: OrderEntity;
}