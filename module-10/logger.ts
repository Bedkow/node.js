import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
    new transports.File({ filename: "combined.log" }),
  ],
});

export default logger;