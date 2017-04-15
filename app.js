var express = require('express');
var bodyParser= require('body-parser');
var exphbs  = require('express-handlebars');
var path    = require('path');

// routes
var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
var hbs = exphbs.create({
    defaultLayout: 'default',
    extname: 'hbs', //file extenstion name (.hbs)
    partialsDir: [
        'views/partials/'
    ]
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use(bodyParser.urlencoded({extended: true}))

// assets path
app.use(express.static(path.join(__dirname, '/dist')));

// mount the index route at the / path
app.use('/', index); 
//app.use('/users', users);

app.post('/quotes', (req, res) => {
  console.log(req.body);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.locals.message = err.message;
  res.render('error', {
        title: err
  });
});


// listening
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(err, req) {
    if(err) {
        console.log('server error');
    } else {
        console.log('server listening on: 3000');
    }
});

module.exports = app;