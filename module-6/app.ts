import express from 'express';
import { getAllProducts, getAllOrders, getAllUsers } from './src/dataAccess.repository.ts';
import router from './src/presentationLayer.controller.ts'

const app = express();
app.use(express.json());

const PORT: number = 3500 || process.env.PORT;

const mainRouter = router;
app.use('/', mainRouter);

app.listen(PORT, () => {
    console.log(`express listening on port ${PORT}`)
})