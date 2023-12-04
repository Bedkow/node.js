import "dotenv/config";
import express from "express";
import router from "./src/presentationLayer.controller.ts";

const app = express();
app.use(express.json());

const PORT: number = process.env.DB_PORT? +process.env.DB_PORT : 3500;

const mainRouter = router;
app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});