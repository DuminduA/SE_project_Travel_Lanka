var express = require('express');
var router = express.Router();
var Post = require('../models/post');


/*

* since database queries are asynchronous we need to take the posts in the callback function so that loop will run until t
* the posts are available.
* 
* */

router.get('/main', function(req, res, next) {

    if(req.isAuthenticated()){
        var user_type = req.user.user_type;
        var user_id = req.user._id;
        var user_name = req.user.name;




        Post.find(function(err,docs){
            res.render('home/home', { title: 'Home',layout:'layout2' ,posts:docs,user_name:user_name,
                user_type:user_type,user_id:user_id,loggedin1:true});
        });
    }
    else{
        Post.find(function(err,docs){
            res.render('home/home', { title: 'Home',layout:'layout2' ,posts:docs,loggedin1:false});
        });
    }
    

});


module.exports = router;