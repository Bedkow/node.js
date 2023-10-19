// The lowest layer. All code related to storing our data somewhere should be in this layer. This layer knows what database is used, SQL, joins, aggregation functions, and so on. It doesn’t know anything about the protocol, business logic, or some services that are used in our application.

import fs from "fs";
import path from "path";
import _ from "lodash";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { ProductEntity } from "./entities/product.entity.ts";
import { UserEntity } from "./entities/user.entity.ts";
import { OrderEntity } from "./entities/order.entity.ts";
import { CartEntity, cart } from "./entities/cart.entity.ts";

const __dirname: string = dirname(fileURLToPath(import.meta.url));

export const getAllOrders = (): OrderEntity[] | [] => {
	const allOrders = fs.readFileSync(
		path.resolve(__dirname, "./data/orders.json"),
		"utf8"
	);
	return JSON.parse(allOrders);
};

export const getAllUsers = (): UserEntity[] | [] => {
	const allUsers = fs.readFileSync(
		path.resolve(__dirname, "./data/users.json"),
		"utf8"
	);
	return JSON.parse(allUsers);
};

export const getAllProducts = (): ProductEntity[] | [] => {
	const allProducts = fs.readFileSync(
		path.resolve(__dirname, "./data/products.json"),
		"utf8"
	);
	return JSON.parse(allProducts);
};

export const getAllCarts = (): CartEntity[] | [] => {
	const allCarts = fs.readFileSync(
		path.resolve(__dirname, "./data/carts.json"),
		"utf8"
	);
	return JSON.parse(allCarts);
};

export const updateCreateCart = (cartObject: CartEntity): {code: number, message: string} => {
	const allCarts: CartEntity[] = getAllCarts();
	const foundCart: CartEntity | undefined = allCarts.find((cart: any) => {
		return cart.id === cartObject.id;
	});
	if (foundCart) {
		const cartIndex: number = allCarts.findIndex((cart: any) => {
			return cart.id === cartObject.id;
		});
		const cartKeysToUpdate: string[] = Object.keys(cartObject);
		cartKeysToUpdate.forEach((key: string) => {
			(allCarts[cartIndex] as any)[key as keyof CartEntity] =
				cartObject[key as keyof CartEntity];
		});
		fs.writeFile(
			path.resolve(__dirname, "./data/carts.json"),
			JSON.stringify(allCarts),
			(err) => {
				if (err) throw err;
			}
		);
		return {code: 200, message: "Cart updated"};
	} else {
		allCarts.push(cartObject);
		fs.writeFile(
			path.resolve(__dirname, "./data/carts.json"),
			JSON.stringify(allCarts),
			(err) => {
				if (err) throw err;
			}
		);
		return {code: 201, message: "Cart created"};
	}
};
