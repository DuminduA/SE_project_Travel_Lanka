/**
 * Created by dumindu on 08/05/2017.
 */

var posts = require('./../models/post');
var notifications = require('./../models/notification');
var likes = require('./../models/likes');
var comments = require('./../models/comment');



var getProfilePosts= function (req,res) {



    var Notifications;

    var user_type = req.user.user_type;
    var user_id = req.user._id;
    var user_name = req.user.name;
    var available = req.user.available;
    var usertype = user_type=="Tourist";
    var guideuser = user_type=="Guide";
     posts.find({'owner_type':user_type,'owner_id':user_id},function (err,post) {
        if(err){return res.send(err);}
         
         notifications.find({'guide_id':user_id,'status':"Pending"},function (err,notifies) {
             if(err){return res.send(err);}
             
             
             
             Notifications = notifies;
             res.render('profile/profile', { title: 'Express' ,layout:'layout2',
                 posts:post,user_name:user_name,user_type:usertype,guide:guideuser,available:available,notifications:Notifications});
         });

    });
};


var createPost = function (req,res) {
    
    
    
    if(req.file != undefined){
        var path = req.file.filename;
    }
    var title = req.body.title;
    var user = req.user.name;
    var date = new Date().getDate();
    var Month = new Date().getMonth();
    var Year = new Date().getFullYear();
    var Hours = new Date().getHours();
    var Minutes = new Date().getMinutes();
    var Seconds = new Date().getSeconds();
    var text = req.body.create_post;

    

    
    var newPost = new posts();
    
    
    
    newPost.title = title;
    newPost.posted_by = user;
    newPost.owner_id = req.user._id;
    newPost.owner_type = req.user.user_type;
    newPost.time = Hours.toString() + " Hr: " + Minutes.toString() + "Min: " + Seconds.toString() + "Secs";
    newPost.date = date.toString() + "/ " + Month.toString() + "/ " + Year.toString();
    newPost.text = text;
    if(req.file != undefined){
        newPost.image_path = "../uploads/" +path.toString();
    }

    newPost.Likes = 0;
    newPost.dislikes = 0;

    newPost.save(function (err, post) {
        if(err){
            return res.send(err);
        }
            res.redirect('/profile/profile');

            // res.send(newPost);
        
    });
    
}

var deletepost = function (req,res) {
    
    posts.findById(req.params.id,function (err,post) {
        post.remove(function (err) {
            if(err){res.send(err);
            if(!err){
              }}

        });
        res.redirect('/profile/profile');
    });
}



var like = function (req,res) {
    var post_id = req.params.id;
    
    posts.findById(post_id,function (err,post) {
        if(err){return res.send(err);}
        
        likes.count({'post_id':post_id},function (err,result) {
            if(err){return res.send(err);}
            console.log(result);
            if(result==0){
                var newlike = new likes();
                newlike.post_id = post_id;
                newlike.user_id= req.user.id;
                newlike.like= true;
                newlike.Dislike= false;
                newlike.save(function (err) {
                    if(err){return res.send(err);}
                    post.Likes = post.Likes + 1;
                    post.save(function (err) {
                        if(err){return res.send(err);}
                        res.redirect('/profile/profile');
                    });
                });
            }else {
                likes.findOne({'post_id':post_id,'user_id':req.user.id},function (err,result2) {
                    console.log(result2.Dislike)
                    if (result2.like) {
                        return res.redirect('/profile/profile');
                    }
                    if (result2.Dislike) {
                        post.Likes = post.Likes + 1;
                        post.dislikes = post.dislikes - 1;
                        post.save(function (err) {
                            if (err) {
                                return res.send(err);
                            }
                            result2.like = true;
                            result2.Dislike = false;
                            result2.save(function (err) {
                                if(err){return res.send(err);}
                                return res.redirect('/profile/profile')
                            });

                        });
                    }
                    
                    
                });
                
               
                

            }
        });
    });
    
    
    
}
var dislike = function (req,res) {

    var post_id = req.params.id;

    posts.findById(post_id,function (err,post) {
        if(err){return res.send(err);}

        likes.count({'post_id':post_id},function (err,result) {
            if(err){return res.send(err);}
            console.log(result);
            if(result==0){
                var newlike = new likes();
                newlike.post_id = post_id;
                newlike.user_id= req.user.id;
                newlike.like= false;
                newlike.Dislike= true;
                newlike.save(function (err) {
                    if(err){return res.send(err);}
                    post.dislikes = post.dislikes + 1;
                    post.save(function (err) {
                        if(err){return res.send(err);}
                        res.redirect('/profile/profile');
                    });
                });
            }else {
                likes.findOne({'post_id':post_id,'user_id':req.user.id},function (err,result2) {
                    console.log(result2.Dislike)
                    if (result2.Dislike) {
                        return res.redirect('/profile/profile');
                    }
                    if (result2.like) {
                        post.dislikes = post.dislikes + 1;
                        post.Likes = post.Likes - 1;
                        post.save(function (err) {
                            if (err) {
                                return res.send(err);
                            }
                            result2.like = false;
                            result2.Dislike = true;
                            result2.save(function (err) {
                                if(err){return res.send(err);}
                                return res.redirect('/profile/profile')
                            });

                        });
                    }


                });




            }
        });
    });


}



module.exports = {
    getProfilePosts:getProfilePosts,
    createpost : createPost,
    deletepost:deletepost,
    like:like,
    dislike:dislike
    };