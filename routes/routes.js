require('dotenv').config();
var dbHost = process.env.APP_DB_HOST;
var dbUser = process.env.APP_DB_USER;
var dbPass = process.env.APP_DB_PASS;
var dbName = process.env.APP_DB_NAME;

var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var sqlPool = {
  connectionLimit: 10,
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName
};

var connect = mysql.createPool(sqlPool);

// Connect to DB
//connection.connect(function(err) {
//  if (err) throw err
//  console.log('mysql db is connected.')
//})

// GET * items
router.get('/', function (req, res) {
  connect.query('SELECT * FROM name', function(err, result) {
    if (err) console.log(err.code);
      res.render('index', {
        title: 'To-Do List',
        todos: result
      });
  });
});

// Create item
router.post('/create', (req, res, next) => {
  var name = req.body.name;
  connect.query('INSERT INTO name SET ?', req.body, function(err, result) {
    if (err) console.log(err.code);
  	console.log('created: ' + JSON.stringify(name));
  	//res.send(req.body);
    //console.log(result.insertId);
    var id = JSON.stringify(result.insertId);
    res.json({
      success: true,
      name: name,
      id: id
    });
  })
})

// Delete item (passes GET req from link click via ajax)
router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  connect.query('DELETE FROM name WHERE id= ?', [id], function(err, result) {
    if (err) console.log(err.code);
    console.log('deleted: ' + JSON.stringify(id));
  });
});

module.exports = router;
