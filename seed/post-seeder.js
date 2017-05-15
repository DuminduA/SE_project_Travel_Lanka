var post = require('../models/post');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/DB_TravelLanka');

var posts = [

    new post({
        title:'Post1',
        posted_by:'1st hotel',
        time:'10:34 pm',
        image_path:'../../images/downloads-bg.jpg',
        text:'this is the post 1. hell yeah it is working',
        Likes:1025,
        dislikes:5

    }),

    new post({
        title:'Post2',
        posted_by:'2st hotel',
        time:'10:34 pm',
        image_path:'../../images/512px-View_from_Ambewela,_Sri_Lanka.jpg',
        text:'this is the post 2. hell yeah it is working',
        Likes:102,
        dislikes:52

    })



];
var done =0;
for(var i=0; i< posts.length;i++){
    posts[i].save(
        function (err,docs) {
            done++;
            if(done== posts.length){mongoose.disconnect();
        }
        }
    );
}