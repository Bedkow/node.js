// Or Service layer. The middle layer. All business logic related to our application might be in this layer. This layer knows about our application entities such as user, order, comment, post, and so on. It doesn't care what protocol is used for transferring data to a client, or whether data will be sent in a body or in a header.
import Joi from 'joi';
import { ProductEntity } from "./entities/product.entity.ts";
import { getAllCarts, getAllProducts } from "./dataAccess.repository.ts";
import { CartEntity } from "./entities/cart.entity.ts";

export const findProductByID = (id: string): ProductEntity | undefined => {
	const allProducts = getAllProducts();

	return allProducts.find((el: ProductEntity) => {
		return el.id === id;
	});
};

export const findCartByUserID = (id: string): CartEntity | undefined => {
	const allCarts = getAllCarts();

	return allCarts.find((el: CartEntity) => {
		return el.userId === id
	});
}

export const validateCartSchema = (cartObject: CartEntity): any => {
	const schema = Joi.object({
		id: Joi.string().required(),
		userID: Joi.string().required(),
		isDeleted: Joi.boolean().required(),
		items: Joi.array().items(Joi.any()).required(),
	});

	const validationResult = schema.validate(cartObject);

	if (validationResult.error) {
		return {code: 400, error: validationResult.error.details};
	} else {
		return {code: 200, value: validationResult.value};
	}
}