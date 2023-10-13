//The highest layer. This layer should contain logic related to a presentation of our application to a client. For example, this layer can have logic related to the protocol that was chosen for the application. This layer knows what is HTTP request, response, header, body, socket, internet, and so on.

import express from 'express';
import { getAllProducts } from './dataAccess.repository.ts';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({REST: "API"})
})

// get all products
router.get('/products', (req, res) => {
    res.json(getAllProducts())
})



export default router