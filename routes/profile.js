var express = require('express');
var router = express.Router();

var postsController = require('../controllers/PostController');

// to have csrf protection. this will maintain sessions. so the server cam know what browser
// initiated the session using the csrfToken
var csurf = require('csurf');
var passport = require('passport');

var csrfProtection = csurf(); // use the csurf package

router.use(csrfProtection);// all the routes included on the router package above will have csrf Protection



router.get('/profile',isLoggedIn,postsController.getProfilePosts);

router.get('/logout',isLoggedIn,function (req,res,next) {
    req.logOut();
    res.redirect('/home/main');
});

router.get('/profileDetails',isLoggedIn,function(req, res, next) {
    res.render('profile/profileDetails', {layout:'layout2',csrfToken:req.csrfToken()});
});




router.post('/profileDetails',isLoggedIn,function (req,res,next) {
    var userType = req.body.user_type;


    if(userType == 'Tourist'){
        req.user.user_type = userType;
        req.user.country = req.body.country;
        req.user.age = req.body.age;

        
        req.user.save(function (err,user) {
            if(err){return res.send(err);}
            res.render('profile/profile',{layout:'layout2',csrfToken:req.csrfToken(),user_name:req.user.name});
        });
    }
    else if(userType == 'Guide'){
        req.user.user_type = userType;
        req.user.sex = req.body.gender;
        req.user.nationality = req.body.nationality;
        req.user.age = req.body.age;
        req.user.AddressLine1 = req.body.AddressLine1;
        req.user.AddressLine2 = req.body.AddressLine2;
        req.user.AddressLine3 = req.body.AddressLine3;
        req.user.AddressLine4 = req.body.AddressLine4;
        req.user.telephone = req.body.tele;

        req.user.save(function (err,user) {
            if(err){return res(err);}
            res.render('profile/profile',{layout:'layout2',csrfToken:req.csrfToken(),user_name:req.user.name});

        });
    }
    else{
        req.user.user_type = userType;
        req.user.AddressLine1 = req.body.AddressLine1;
        req.user.AddressLine2 = req.body.AddressLine2;
        req.user.AddressLine3 = req.body.AddressLine3;
        req.user.AddressLine4 = req.body.AddressLine4;
        req.user.telephone = req.body.tele;

        req.user.save(function (err,user) {
            if(err){return res(err);}
            res.render('profile/profile',{layout:'layout2',csrfToken:req.csrfToken(),user_name:req.user.name});

        });
    }
});



router.use('/',isNotLoggedIn,function (req,res,next) {
    next();
});





router.get('/signup',function(req, res, next) {
    var messages = req.flash('error'); // store the messeges under error and get the possible flash messeges from flash()
    console.log(messages);
    res.render('login/signup', {layout:'signup_layout',csrfToken:req.csrfToken(), messages:messages
    ,hasErrors:messages.length>0});// passing the meseges to the view. if messeges has a length that means we got an error

});




router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/profile/profileDetails',
    failureRedirect:'/profile/signup',
    failureFlash:true // this will flash a messege which setup in the psssport.js
}));


router.post('/login',passport.authenticate('local.login',{
    successRedirect:'/profile/profile',
    failureRedirect:'/profile/signup',
    failureFlash:true // this will flash a messege which setup in the psssport.js
}));


/*create a middleware to make some routes usable only if loggedin
*/
function isLoggedIn(req, res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{res.redirect('/')};
};


function isNotLoggedIn(req, res,next){
    if(!req.isAuthenticated()){
        next();
    }
    else{res.redirect('/')};
};





module.exports = router;