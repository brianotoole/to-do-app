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


// REGISTER
router.get('/register', function (req, res) {
  res.render('register', {
    title: 'Register'
  });
});

router.post('/register', function(req, res) {
  var today = new Date();
  var users = {
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today
  }
  connect.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  } else {
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
    });
  }
  });
});




// Login
router.get('/login', function (req, res) {
  res.render('login', {
    title: 'Login'
  });
});
router.post('/login', function (req, res) {
  var email= req.body.email;
  var password = req.body.password;
  connect.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  } else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if([0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password do not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exist"
          });
    }
  }
  });
});

module.exports = router;
