//The highest layer. This layer should contain logic related to a presentation of our application to a client. For example, this layer can have logic related to the protocol that was chosen for the application. This layer knows what is HTTP request, response, header, body, socket, internet, and so on.

import express from 'express';
import { getAllProducts, updateCreateCart } from './dataAccess.repository.ts';
import { findProductByID, findCartByUserID, validateCartSchema } from './businessLogic.service.ts';
import { customError } from './helpers/customError.ts';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({REST: "API"})
})

// get all products
router.get('/products', (req, res) => {
    res.json(getAllProducts())
})

// get product by id
router.get('/products/:id', (req, res) => {
    if (findProductByID(req.params.id)) {
        res.status(200);
        res.json(findProductByID(req.params.id))
    } else if (!findProductByID(req.params.id)){
        res.status(404);
        res.json({error: customError('product', req.params.id)});
    } else {
        res.status(500);
        res.json({error: "Internal Server Error"});
    }
})

//get cart
router.get('/profile/cart/:userID', (req, res) => {
    if (findCartByUserID(req.params.userID)) {
        res.status(200);
        res.json(findCartByUserID(req.params.userID));
    } else if (!findCartByUserID(req.params.userID)) {
        res.status(404);
        res.json({error: customError('cart', req.params.userID)});
    } else {
        res.status(500);
        res.json({error: "Internal Server Error"});
    }
});

//create/update cart
router.put('/profile/cart', (req, res) => {
    const validationResult = validateCartSchema(req.body);
    if (validationResult.code === 400) {
        res.status(validationResult.code);
        res.json({error: validationResult.error});
    } else if (validationResult.code === 200) {
        const resObj: {code: number, message: string} = updateCreateCart(req.body);
        res.status(resObj.code);
        res.json({message: resObj.message})
    }
})

export default router