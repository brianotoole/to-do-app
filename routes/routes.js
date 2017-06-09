var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var db;

// Connect to DB
MongoClient.connect('mongodb://dev:35Xsi6C8*136@ds161640.mlab.com:61640/todolist', (err, database) => {
    db = database;
});

// GET items in db collection()
router.get('/', function (req, res) {
  db.collection('todos').find().toArray((err, result) => {
      res.render('index', {
        title: 'To-Do List',
        todos: result
      });
  });
});

// GET req, success
router.get('/success/:name', function (req, res, next) {
    res.render('success', {
        title: 'Success',
        output: req.params.name
    });
});

// POST req, save item via form action
router.post('/create', (req, res, next) => {
  db.collection('todos').save(req.body, (err, result) => {
    if (err) return console.log(err)
    var obj = {};
  	console.log('body: ' + JSON.stringify(req.body));
  	res.send(req.body);
    console.log('Item saved.');
  })
})

// GET req, delete item
router.get('/delete/:name', function (req, res) {
  var name = req.params.name;
  db.collection('todos').remove({ name }, function(err) {
    res.redirect( '/' );
    console.log('Item deleted.');
  });
});

module.exports = router;
