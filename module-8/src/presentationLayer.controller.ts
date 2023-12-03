import express from 'express';
import { dbContext } from './dataAccess.repository.ts';
import { validateCartSchema } from './helpers/validators.ts';
import { customError } from './helpers/customError.ts';
import { updateCreateCart } from './businessLogic.service.ts';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ REST: 'API' });
});

// get all products
router.get('/products', async (req, res) => {
  const products = await dbContext.productModel.find();
  res.json(products);
});

// get product by id
router.get('/products/:id', async (req, res) => {
  const product = await dbContext.productModel.findById(req.params.id);

  if (product) {
    res.status(200);
    res.json(product);
  } else {
    res.status(404);
    res.json({ error: customError('product', req.params.id) });
  }
});

// get cart by user id
router.get('/profile/cart/:userId', async (req, res) => {
  const cart = await dbContext.cartModel.findOne({ user: req.params.userId });

  if (cart) {
    res.status(200);
    res.json(cart);
  } else {
    res.status(404);
    res.json({ error: customError('cart', req.params.userId) });
  }
});

// create/update cart
router.put('/profile/cart', async (req, res) => {
  const validationResult = validateCartSchema(req.body);
  if (validationResult.code === 400) {
    res.status(validationResult.code);
    res.json({ error: validationResult.error });
  } else {
    const resObj = await updateCreateCart(req.body);
    res.status(resObj.code);
    res.json({ message: resObj.message });
  }
});

export default router;