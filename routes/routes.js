require('dotenv').config();
var dbHost = process.env.APP_DB_HOST;
var dbUser = process.env.APP_DB_USER;
var dbPass = process.env.APP_DB_PASS;
var dbName = process.env.APP_DB_NAME;

var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName
})

// Connect to DB
connection.connect(function(err) {
  if (err) throw err
  console.log('mysql db is connected.')
})

// GET * items
router.get('/', function (req, res) {
  connection.query('SELECT * FROM name', function(err, result) {
      res.render('index', {
        title: 'To-Do List',
        todos: result
      });
  });
});

// POST, create item
router.post('/create', (req, res, next) => {
  var name = req.body.name;
  connection.query('INSERT INTO name SET ?', req.body, function(err, result) {
    if (err) return console.log(err)
    var obj = {};
  	console.log('created: ' + JSON.stringify(name));
  	res.send(req.body);
  })
})

// GET req, delete item
router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  connection.query('DELETE FROM name WHERE id= ?', [id], function(err, result) {
    //res.redirect( '/' );
    console.log('deleted: ' + JSON.stringify(id));
  });
});

module.exports = router;
