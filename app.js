var express = require('express');
var bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();

// Connect to mongo db
var db;
MongoClient.connect('mongodb://dev:35Xsi6C8*136@ds161640.mlab.com:61640/todolist', (err, database) => {
    // start the server, but only when db is connected
    db = database;
    app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(err, req) {
        if(err) {
            console.log('server error');
        } else {
            console.log('server listening on: 3000');
        }
    });
});

// view engine setup
var hbs = exphbs.create({defaultLayout: 'default',extname: 'hbs', partialsDir: ['views/partials/']});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// set assets path
app.use(express.static(path.join(__dirname, '/dist')));

// GET req, index
app.get('/', function (req, res) {
  // find all items in db collection('name')
  db.collection('todos').find().toArray((err, result) => {
      res.render('index', {
        title: 'To-Do List',
        todos: result
      });
  });
});

// GET req, success
//app.get('/success/:name', function (req, res, next) {
//    res.render('success', {
//        title: 'Success',
//        output: req.params.name
//    });
//});

// POST req, save item via form action
app.post('/submit', (req, res, next) => {
  db.collection('todos').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/');
    console.log('Item saved.');
  })
})

// GET req, delete item
app.get('/delete/:name', function (req, res) {
  var name = req.params.name;
  db.collection('todos').remove({ name }, function(err) {
    res.redirect( '/' );
    console.log('Item deleted.');
  });
});
