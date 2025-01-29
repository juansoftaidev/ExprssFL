// index.js

import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import { createClient } from 'redis';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Create a Redis client
const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

// Handle Redis connection errors
client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to the Redis server
await client.connect();

// Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});