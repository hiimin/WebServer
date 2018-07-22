var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var port = 8801;
var server = app.listen(port, function () {
    console.log('Express listening on port', port);
});
var listen = require('socket.io');
var io = listen(server);

//var port = 8801;
//var io = require('socket.io').listen(port);

var count = 1;
io.on('connection', function (socket) {
    console.log('user connected: ', socket.id);

    socket.emit('news', 'This is the news');

    socket.on('newresponse', function (data) {
        console.log(data);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected :'+socket.id);
    });

    var name = "user" + count++;
    io.to(socket.id).emit('change name', name);

    socket.on('send message',function (name, text) {
        var msg = name + ' : ' + text;
        console.log(msg);
        io.emit('receive message', msg);
    });
});

