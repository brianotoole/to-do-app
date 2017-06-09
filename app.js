require('dotenv').config();
var port = process.env.APP_PORT || 3000;
var host = process.env.APP_HOST || 'localhost';

var express = require('express');
var path = require('path');
var bodyParser= require('body-parser');

var exphbs = require('express-handlebars');
var routes = require('./routes/routes');
var app = express();

// view engine setup
var hbs = exphbs.create({defaultLayout: 'default',extname: 'hbs', partialsDir: ['views/partials/']});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// set assets path
app.use(express.static(path.join(__dirname, '/dist')));

// use routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// start server
app.listen(port, function (err) {
  if (err) {
    console.log('error')
  } else {
    console.log('listening on port 3000!')
  }
})

module.exports = app;
