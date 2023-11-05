import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config.ts";
import { OrdersRepository } from "./repositories/orders.repository.ts";
import { UsersRepository } from "./repositories/users.repository.ts";
import { ProductsRepository } from "./repositories/products.repository.ts";
import { CartsRepository } from "./repositories/carts.repository.ts";

export const dbContext = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  return {
    orm,
    ordersRepository: orm.em.getRepository(OrdersRepository),
    usersRepository: orm.em.getRepository(UsersRepository),
    productsRepository: orm.em.getRepository(ProductsRepository),
    cartsRepository: orm.em.getRepository(CartsRepository),
  };
};

interface UpdateCreateCartResponse {
	code: number;
	message: string;
  }
  
  export async function updateCreateCart(cartData: any, cartsRepository: CartsRepository): Promise<UpdateCreateCartResponse> {
  
	const existingCart = await cartsRepository.findCartByUserID(cartData.userId);
  
	if (existingCart) {
	  await cartsRepository.updateCart(cartData);
	  return { code: 200, message: 'Cart updated successfully.' };
	} else {
	  await cartsRepository.createCart(cartData);
	  return { code: 201, message: 'Cart created successfully.' };
	}
  }