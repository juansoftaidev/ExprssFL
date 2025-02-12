/**
 * @file express-user.routes.js
 * @description User routes for the Nde app, including CRUD operations and Rate limiting.
 * @author [@Juansito]
 * 
 */

import express from 'express';
import limiter from '../utils/express-rate-limit.limiter.js'; // Adjust the path as necessary




const router = express.Router();

// Mock user data for demonstration purposes
let users = [
  { id: 1, name: 'User   One', age: 25, email: 'userone@example.com' },
  { id: 2, name: 'User   Two', age: 30, email: 'usertwo@example.com' },
  { id: 3, name: 'User   Three', age: 22, email: 'userthree@example.com' },
];

// Apply rate limiting to all user routes
router.use(limiter);

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User  not found' });
  }
});

// Get user by name
router.get('/name/:name', (req, res) => {
  const userName = req.params.name;
  const user = users.find(u => u.name.toLowerCase() === userName.toLowerCase());

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User  not found' });
  }
});

// Get user count
router.get('/count', (req, res) => {
  res.json({ count: users.length });
});

// Create a new user
router.post('/', (req, res) => {
  const { name, age, email } = req.body;
  const newUser = {
    id: users.length + 1, // Simple ID generation
    name,
    age,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    const { name, age, email } = req.body;
    users[userIndex] = { id: userId, name, age, email };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'User  not found' });
  }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ error: 'User  not found' });
  }
});

// Get users by age
router.get('/age/:age', (req, res) => {
  const userAge = parseInt(req.params.age, 10);
  const filteredUsers = users.filter(u => u.age === userAge);

  if (filteredUsers.length > 0) {
    res.json(filteredUsers);
  } else {
    res.status(404).json({ error: 'No users found with that age' });
  }
});

// Get users by email
router.get('/email/:email', (req, res) => {
  const userEmail = req.params.email;
  const user = users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User  not found' });
  }
});

export default router;