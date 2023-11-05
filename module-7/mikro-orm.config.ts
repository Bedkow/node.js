import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ProductEntity } from "./src/entities/product.entity.ts";
import { UserEntity } from "./src/entities/user.entity.ts";
import { OrderEntity } from "./src/entities/order.entity.ts";
import { CartEntity } from "./src/entities/cart.entity.ts";
import { ProductsRepository } from "./src/repositories/products.repository.ts";
import { OrdersRepository } from "./src/repositories/orders.repository.ts";
import { UsersRepository } from "./src/repositories/users.repository.ts";
import { CartsRepository } from "./src/repositories/carts.repository.ts";
import { Options } from "@mikro-orm/core";

export default {
  entities: [ProductEntity, UserEntity, OrderEntity, CartEntity],
  dbName: process.env.DATABASE_URL,
  debug: process.env.DEBUG,
  type: "postgresql",
  migrations: {
    tableName: "mikro_orm_migrations",
    path: "./migrations",
  },
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: "localhost",
  repositories: [ProductsRepository, OrdersRepository, UsersRepository, CartsRepository],
} as Options;