
/***********************************************
Requerimiento de módulos 
*************************************************/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const db = require('./models/db');

/// Models/////////////////////////////
const User = require('./models/users');
const Post = require('./models/posts');
const Company = require('./models/company');
const Offer = require('./models/offers');

const index = require('./routes/index');
const session = require('express-session');
const usersRouter = require('./routes/users'); 
const passport = require('passport');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

/////////////////////Testing//////////////////

const chai = require('chai');


// Express objet created

var app = express();

// Helmet
app.use(helmet());

app.disable('x-powered-by');



/*****************************************************************************************************
                                        Passport Strategies

******************************************************************************************************/


require('./passports/strategies/local')(passport,User);
require('./passports/strategies/google')(passport,User);
require('./passports/passport')(passport,User);




// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'view-ui'));

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); /// si lo cambias te manda un archivo JSON
app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); // Body limit is 10


app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "Tomaster@ws", secure:true  }));

 const limit = rateLimit({
    max: 100,// max requests
    windowMs: 20 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Too many requests' // message to send
});

app.use(limit);

app.use(passport.initialize());
app.use(passport.session());




/*****************************************************************************************                
*
*                            Controllers
*
******************************************************************************************/
//Controllers
var controllerCompany = require('./controllers/companies');
var controllerUser = require('./controllers/userController');



/*****************************************************************************************                
*
*                            Routing  Express
*
******************************************************************************************/


require('./routes/index.js')(app);

require('./routes/users.js')(app,passport,session,jwt,User,Company,controllerUser);

require('./routes/companies.js')(app,session,Company,controllerCompany);






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


