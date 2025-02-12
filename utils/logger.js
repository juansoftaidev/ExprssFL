import winston from 'winston';

// Create a logger instance with a specific name
const createLogger = (name) => {
    return winston.createLogger({
        level: 'info', // Default logging level
        format: winston.format.combine(
            winston.format.timestamp(), // Add timestamp to logs
            winston.format.json() // Log in JSON format
        ),
        transports: [
            // Console transport
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(), // Colorize console output
                    winston.format.simple() // Simple format for console
                ),
            }),
            // File transport
            new winston.transports.File({
                filename: 'logs/app.log', // Log file path
                level: 'error', // Log only error messages to the file
            }),
        ],
        defaultMeta: { service: name }, // Add service name to logs
    });
};

// Export a logger instance with a specific name
const logger = createLogger('MyApp'); // Replace 'MyApp' with your application name

export default logger;