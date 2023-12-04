import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ProductEntity } from "./src/models/product.model.ts";
import { UserEntity } from "./src/models/user.model.ts";
import { OrderEntity } from "./src/models/order.model.ts";
import { CartEntity } from "./src/models/cart.model.ts";
import { ProductsRepository } from "./src/repositories/products.repository.ts";
import { OrdersRepository } from "./src/repositories/orders.repository.ts";
import { UsersRepository } from "./src/repositories/users.repository.ts";
import { CartsRepository } from "./src/repositories/carts.repository.ts";
import { Options } from "@mikro-orm/core";

export default {
  entities: [ProductEntity, UserEntity, OrderEntity, CartEntity],
  dbName: process.env.DB_NAME,
  debug: process.env.DEBUG === "true",
  type: "postgresql",
  migrations: {
    tableName: "mikro_orm_migrations",
    path: "./migrations",
  },
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  repositories: [
    ProductsRepository,
    OrdersRepository,
    UsersRepository,
    CartsRepository,
  ],
} as Options;
