import "dotenv/config";
import express from "express";
import expressWinston from "express-winston";
import logger from "./logger.ts";
import router from "./src/presentationLayer.controller.ts";

const app = express();
app.use(express.json());

const PORT: number = process.env.DB_PORT ? +process.env.DB_PORT : 3500;

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: "{{req.method}} {{req.url}} {{res.responseTime}}ms",
    expressFormat: true,
    colorize: true,
  })
);

const mainRouter = router;
app.use("/api", mainRouter);

const server = app.listen(PORT, () => {
  logger.info(`Express listening on port ${PORT}`);
});

// Graceful shutdown
const connections: NodeJS.Socket[] = [];

server.on("connection", (connection: NodeJS.Socket) => {
  // Register connections
  connections.push(connection);

  // Remove/Filter closed connections
  connection.on("close", () => {
    connections.splice(connections.indexOf(connection), 1);
  });
});

function shutdown() {
  console.log("Received kill signal, shutting down gracefully");

  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 20000);

  // End current connections
  connections.forEach((connection) => connection.end());

  // Then destroy connections
  setTimeout(() => {
    connections.forEach(
      (connection) => ((connection as unknown) as { destroy: () => void }).destroy()
    );
  }, 10000);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);