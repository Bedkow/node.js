import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Collection,
  OneToMany,
} from "@mikro-orm/core";
import { UserEntity } from "./user.entity.ts";
import { ProductEntity } from "./product.entity.ts";

@Entity()
export class CartEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.cart, { eager: true })
  items = new Collection<ProductEntity[]>(this);

  @Property()
  createdAt: Date = new Date();
}