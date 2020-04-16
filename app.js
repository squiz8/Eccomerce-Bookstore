var createError = require('http-errors');
var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var connectFlash = require('connect-flash');

var db = require('./lib/db');

var indexRouter = require('./routes/index');
var pagesRouter = require('./routes/pages');
var booksRouter = require('./routes/books');
var adminRouter = require('./routes/admin');
var cartRouter  = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


// Handle Express Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

/*
// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
*/

app.use(express.static(path.join(__dirname, 'public')));
//To get flash messages
app.use(connectFlash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', indexRouter);
app.use('/pages', pagesRouter);
app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
