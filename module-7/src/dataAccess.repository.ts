import { MikroORM, EntityManager } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config.ts";
import { OrderEntity } from "./entities/order.entity.ts";
import { UserEntity } from "./entities/user.entity.ts";
import { ProductEntity } from "./entities/product.entity.ts";
import { CartEntity } from "./entities/cart.entity.ts";
import { OrdersRepository } from "./repositories/orders.repository.ts";
import { UsersRepository } from "./repositories/users.repository.ts";
import { ProductsRepository } from "./repositories/products.repository.ts";
import { CartsRepository } from "./repositories/carts.repository.ts";

export const dbContext = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  // Cast the custom repositories to their respective types
  const productsRepository = orm.em.getRepository(ProductEntity) as ProductsRepository;
  const ordersRepository = orm.em.getRepository(OrderEntity) as OrdersRepository;
  const usersRepository = orm.em.getRepository(UserEntity) as UsersRepository;
  const cartsRepository = orm.em.getRepository(CartEntity) as CartsRepository;

  return {
    orm,
    ordersRepository,
    usersRepository,
    productsRepository,
    cartsRepository,
  };
};