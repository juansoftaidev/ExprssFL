import rateLimit from 'express-rate-limit';

// [OWSP-BLUE-TCK98763]
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        error: 'Too many requests, please try again later.',
    },
});

export default limiter;