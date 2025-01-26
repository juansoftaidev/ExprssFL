var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  const userId = req.params.id;
  // Replace with actual logic to fetch user data by ID
  res.json({ id: userId, name: 'User  Name' });
});

module.exports = router;