const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "server/log/logger.error", level: "error" }),
    new winston.transports.File({ filename: "server/log/logger.combined" })
  ]
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if(process.env.NODE_ENV !== "production"){
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.errors({stack: true}),
      winston.format.simple()
    )
  }));
}

// Workaround to print Error objects neatly.
logger.error = item => {
  const message = item instanceof Error ? item.stack : item;
  logger.log({ level: 'error', message });
};


// Logger must have the methods: debug(), info(), warn(), error()
module.exports = logger;
