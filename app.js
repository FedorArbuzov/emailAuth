var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var config = require('./config/keys');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoURI)
    .then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));

var expressValidator = require('express-validator');
var passport = require('passport');

var authRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', authRouter);

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

app.use(expressValidator);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function () {
    // set the 'dbUrl' to the mongodb url that corresponds to the
    // environment we are in
    app.set('dbUrl', config.mongoURI);
    // connect mongoose to the mongo dbUrl
    mongoose.connect(app.get('dbUrl'));
});

app.set('port', process.env.PORT || 8000);
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
