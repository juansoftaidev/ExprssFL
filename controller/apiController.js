// controllers/apiController.js

import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Handle Redis connection errors
client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Connect to the Redis server
await client.connect();

const dataKey = 'items'; // Key to store items in Redis

export const getAllItems = async (req, res) => {
    try {
        const items = await client.lRange(dataKey, 0, -1); // Get all items from Redis
        res.json(items.map(item => JSON.parse(item))); // Parse and return items
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await client.lIndex(dataKey, id); // Get item by index
        if (!item) return res.status(404).send('Item not found');
        res.json(JSON.parse(item)); // Parse and return the item
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const createItem = async (req, res) => {
    const newItem = {
        id: await client.lLen(dataKey), // Use the length of the list as the ID
        ...req.body
    };
    try {
        await client.rPush(dataKey, JSON.stringify(newItem)); // Add new item to Redis
        res.status(201).json(newItem); // Return the created item
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body; // Get the updated item from the request body
    try {
        const item = await client.lIndex(dataKey, id); // Get the existing item
        if (!item) return res.status(404).send('Item not found');

        // Update the item in Redis
        await client.lSet(dataKey, id, JSON.stringify({ ...JSON.parse(item), ...updatedItem }));
        res.json({ ...JSON.parse(item), ...updatedItem }); // Return the updated item
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await client.lIndex(dataKey, id); // Get the existing item
        if (!item) return res.status(404).send('Item not found');

        // Remove the item from Redis
        await client.lRem(dataKey, 1, item);
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};