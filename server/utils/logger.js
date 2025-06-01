const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create logger
const logger = winston.createLogger({
  level: 'info', // Log level (error, warn, info, verbose, debug, silly)
  format: combine(
    colorize(), // Colorize log levels
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    logFormat // Apply custom format
  ),
  transports: [
    // Log to console
    new winston.transports.Console(),
    // Log errors to a file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Log all messages to a file
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;