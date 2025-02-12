/**
 * @file express-rate-limitnpm install winston.js
 * @description flexible express-rate-limit
 * @author [@Juansito]
 * 
 */

import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js'; // Assuming you have a logger utility



// Configuration variables
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // Limit each IP to 100 requests per window

// Rate limiting middleware configuration
const createRateLimiter = (windowMs, max) => {
    return rateLimit({
        windowMs: windowMs || RATE_LIMIT_WINDOW_MS, // Use provided or default value
        max: max || RATE_LIMIT_MAX_REQUESTS, // Use provided or default value
        message: {
            status: 429,
            error: 'Too many requests, please try again later.',
        },
        handler: (req, res) => {
            // Log the rate limit error
            logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
            res.status(429).json({
                status: 429,
                error: 'Too many requests, please try again later.',
            });
        },
        onLimitReached: (req, res) => {
            // Optional: Log when a limit is reached
            logger.info(`Limit reached for IP: ${req.ip}`);
        },
    });
};

// Export a default rate limiter instance with custom options
const limiter = createRateLimiter(RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS);

export default limiter;