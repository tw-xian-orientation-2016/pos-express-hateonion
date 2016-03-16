"use strict";

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let swig = require('swig');
let mongoose = require('mongoose');

let list = require('./routes/list');
let cart = require('./routes/cart');
let receipt = require('./routes/receipt');
let receiptList = require('./routes/receiptList');
let api = require('./routes/api');

let app = express();

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

mongoose.connect('mongodb://127.0.0.1:12306/test1');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
// app.set('view engine', 'jade');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', list);
app.use('/cart', cart);
app.use('/receipt', receipt);
app.use('/receiptList', receiptList);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
