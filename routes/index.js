var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

router.get('/data', async function(req, res, next) {
  try {
    const data = await fetchDataFromDatabase(); // Replace with actual data fetching logic
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;