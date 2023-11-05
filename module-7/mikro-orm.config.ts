import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ProductEntity } from "./entities/product.entity.ts";
import { UserEntity } from "./entities/user.entity.ts";
import { OrderEntity } from "./entities/order.entity.ts";
import { CartEntity } from "./entities/cart.entity.ts";

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
} as Parameters<typeof MikroOrmModule.forRoot>[0];