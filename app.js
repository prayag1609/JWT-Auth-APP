var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();  


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var user_controller = require("./controller/user_controller")
app.get('/user',user_controller.user_home)
app.post('/user/regi',user_controller.user_regi)
var auth = require('./middleware/auth');
app.get('/user/get', auth.check_token, user_controller.user_get);
app.get('/user/get/:user_id', auth.check_token, user_controller.get_user_by_id);
app.get('/alluser', auth.check_token, user_controller.get_all_user);
app.delete("/user/delete/:user_id", auth.check_token, user_controller.delete_user_by_id);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjNDc0ODczN2I3ZGZhZjg4ZmIwODYiLCJpYXQiOjE3NDY2ODM3MjAsImV4cCI6MTc0NjY4NzMyMH0.2wsjFs7_OQAlJrWuBX7nUE1eG6bP7ySd0VK0-nmh_Bc
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjNDdhY2FjNmQ3Mzk0NGFiMDFjNjMiLCJpYXQiOjE3NDY2ODM4MjAsImV4cCI6MTc0NjY4NzQyMH0.bUnroDr3-XhMlhWq2lb1o-FUWhp4oZrTaTZxOrjsh14

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
  res.render('error');
});



module.exports = app;
