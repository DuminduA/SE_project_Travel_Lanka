/**
 * Authentication Methods
 */
var passport = require('passport');
var flash = require('connect-flash');

/**
 *  since app.js file contains the configuration of the passport no need to configure it here as well
 *  because i am ony using a same instace and configuration in one file is avaliable in other files as well.
 */

var tourist = require('../models/tourist');
var  ServiceProvider= require('../models/ServiceProvider');
var LocalStrategy = require('passport-local').Strategy; // accesing the strategy object in the passport local
//i use the local strategy that means locally on this server stored the user

/**
 * Store the user in the session. store the user using id
 */
passport.serializeUser(function (tourist, done) {
        done(null, tourist.id);
});

/**
 * deserialize the user using the id
 */
passport.deserializeUser(function (id,done) {
    tourist.findById(id,function(err, tourist){
        if(tourist){done(err,tourist);}
        else{ServiceProvider.findById(id,function(err, tourist){
            done(err,tourist);
        });}
    });
});

/**
 * create users
 */
passport.use('local.signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function (req, email, password,done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching  

    var usertype = req.body.user_type;
    if(usertype == 'blank'){
        return done(null,false,{message:'please choose a user type'});
    }
    else if(usertype == 'Tourist'){
        tourist.findOne({'email':email},function(err, user){
            if(err){ return done(err);}
            if(user){ return done(null, false , {message:'Email already in use'});} // no error but still does not successful

            var newTourist = new tourist();
             // creating the user and setting attributes
            newTourist.email = email;
            newTourist.password = newTourist.encryptPassword(password);
            newTourist.name = req.body.user_name;
            newTourist.save(function (err,result) {
                if(err){
                    return done(err);
                }
                return done(null, newTourist);
            });
        });
    }
    else if(usertype == 'ServiceProvider'){
        console.log(email);
        ServiceProvider.findOne({'email':email},function(err, user){
            if(err){ return done(err);}
            if(user){ return done(null, false , {message:'Email already in use'});} // no error but still does not successful

            var newSP = new ServiceProvider();
            // creating the user and setting attributes
            newSP.email = email;
            newSP.password = newSP.encryptPassword(password);
            newSP.name = req.body.user_name;
            newSP.save(function (err,result) {
                if(err){
                    return done(err);
                }
                return done(null, newSP);
            });
        });
    }
}));

/**
 * Login Authentication
 */
passport.use('local.login', new LocalStrategy({
    usernameField: 'email_login',
    passwordField: 'password_login',
    passReqToCallback: true
},function (req, email, password,done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
    var usertype = req.body.user_type_login;
    if(usertype == 'blank'){
        return done(null,false,{message:'please choose a user type'});
    }
    else if(usertype == 'Tourist'){
        tourist.findOne({'email':email},function(err, user){
            if(err){ 
                return done(err)
            }
            if(!user){ 
                return done(null, false , {message:'You have to sign up first'});
            } // no error but still does not successful
            if(password!=null){
                if(!user.validPassword(password)){
                return done(null, false , {message:'inValid Password'});
                }
            }
            else{
                return done(null, false , {message:'inValid Password'});
            }
            return done(null, user);
        });
    }
    else if(usertype == 'ServiceProvider') {
        ServiceProvider.findOne({'email': email}, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {message: 'You have to Sign up First '});
            } // no error but still does not successful
            if(password!=null){if(!user.validPassword(password)){
                return done(null, false , {message:'inValid Password'});}
            }
            else{return done(null, false , {message:'inValid Password'});}
            console.log(user);
            return done(null, user);
        });
    }
}));
 