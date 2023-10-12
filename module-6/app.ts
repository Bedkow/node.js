import express from 'express';
import swaggerUiDist from 'swagger-ui-dist';
import { getAllProducts, getAllOrders, getAllUsers } from './src/dataAccess.repository.ts';

const pathToSwaggerUi = swaggerUiDist.absolutePath();

const app = express();

const PORT: number = 3500 || process.env.PORT;

console.log(getAllProducts())

// disable for now
// app.use(express.static(pathToSwaggerUi));

//

app.get('', (req, res) => {
    res.send("Express working")
})

app.listen(PORT, () => {
    console.log(`express listening on port ${PORT}`)
})