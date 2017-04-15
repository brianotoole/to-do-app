var express = require('express');
var router = express.Router();

// Home, GET
router.get('/', function(req, res, next) {
  res.render('index', {
        title: 'Home'
    });
});

// About, GET
router.get('/about', function(req, res, next) {
  res.render('about', {
        title: 'It works!'
    });
});

module.exports = router;