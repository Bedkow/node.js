import express from "express";
import router from "./src/presentationLayer.controller.ts";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config.ts";

(async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	const app = express();
	app.use(express.json());

	const PORT: number = 3500 || process.env.PORT;

	const mainRouter = router;
	app.use("/api", mainRouter);

	app.listen(PORT, () => {
		console.log(`express listening on port ${PORT}`);
	});
})();
