// The lowest layer. All code related to storing our data somewhere should be in this layer. This layer knows what database is used, SQL, joins, aggregation functions, and so on. It doesn’t know anything about the protocol, business logic, or some services that are used in our application.

import fs from "fs";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from "url";

const __dirname: string = dirname(fileURLToPath(import.meta.url))

export const getAllOrders = (): string[] => {
	const allOrders = fs.readFileSync(path.resolve(__dirname, './data/orders.json'), "utf8");
	return JSON.parse(allOrders);
};

export const getAllUsers = (): string[] => {
	const allUsers = fs.readFileSync(path.resolve(__dirname, './data/users.json'), "utf8");
	return JSON.parse(allUsers);
};

export const getAllProducts = (): string[] => {
	const allProducts = fs.readFileSync(path.resolve(__dirname, './data/products.json'), "utf8");
	return JSON.parse(allProducts);
};