import express from 'express';
import swaggerUiDist from 'swagger-ui-dist';
const pathToSwaggerUi = swaggerUiDist.absolutePath();

const app = express();

app.use(express.static(pathToSwaggerUi));

app.listen(3500, () => {
    console.log('express listening')
})