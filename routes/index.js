var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About Us' });
});

router.get('/data', async function (req, res, next) {
  try {
    const data = await fetchDataFromDatabase();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// User-related routes
router.get('/users', function (req, res, next) {
  const users = getUsers(); // Replace with actual user fetching logic
  res.json(users);
});

router.post('/users', function (req, res, next) {
  const newUser = req.body; // Assume body-parser middleware is used
  addUser(newUser); // Replace with actual user adding logic
  res.status(201).json(newUser);
});

// Placeholder function for fetching data
async function fetchDataFromDatabase() {
  return [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
}

// Placeholder functions for user operations
function getUsers() {
  return [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
}

function addUser(user) {
  // Logic to add user to the database
  console.log('User  added:', user);
}

module.exports = router;