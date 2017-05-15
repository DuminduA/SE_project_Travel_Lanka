var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');      // importing the dependencies
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var session = require('express-session'); // this package will create sessions
var passport = require('passport');// authentication
var validator = require('express-validator');

// this package is for flash messages. messages stored in the session.cam be shown in voew
var connect_flash = require('connect-flash');





var index = require('./routes/index');
var home_route = require('./routes/home');    // imports router files
var profile_route = require('./routes/profile');
var post_route = require('./routes/post');
var comment_route = require('./routes/comment');
var guide_route = require('./routes/guide');



// middleware intialization


var app = express();

mongoose.connect('localhost:27017/DB_TravelLanka'); // connect to the mongodb server and use the DB_Travel Lanka database

require('./config/passport'); // importing the authentication. only this way express knows the implementation
app.use(express.static(__dirname + '/public'));

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout :"layout", extname: ".hbs"}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
/*
* resave :true means session will saved on the server on each request and no matter it changed or not
 * and saveUninitialized :true means session will be stored eventhough it is not even initialized*/
app.use(session({secret:'sessionsecretkey',resave:false,saveUninitialized:false}));
app.use(connect_flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));      // use the dependencies


app.use(function (req,res,next) {
  res.locals.loggedin = req.isAuthenticated();
  next();
});



app.use('/home', home_route);
app.use('/post', post_route);
app.use('/comment', comment_route);
app.use('/guide', guide_route);
app.use('/profile', profile_route);
app.use('/', index);            // router grouping



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
