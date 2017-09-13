/**
 * Controller method for comments
 * 
 * @param comment_model
 * @param posts
 * @param notifications
 * @returns {{post: post, showAll: showAll}}
 * @constructor
 */
var CommentController = function (comment_model,posts,notifications) {

    /**
     * Controller for show post
     *
     * @param req
     * @param res
     */
    var post = function (req,res) {
        var comment1 = new comment_model();
        console.log(req.body);
        comment1.text = req.query.comment;
        comment1.owner_id = req.user._id;
        comment1.owner_type = req.user.user_type;
        comment1.post_id = req.params.id;
        comment1.save(function (err,comment) {
            if(err){res.send(err);}
            posts.update({_id:req.params.id},{$push:{Comments:{text:req.query.comment,user:req.user.name}}},function (err) {
                if(err){return res.send(err);}
                res.redirect('/profile/profile');
            });
        });
    };

    /**
     * Method for Show All Posts
     * 
     * @param req
     * @param res
     */
    var showAll = function (req,res) {
        res.redirect('/profile/profile');
    };
    
    return {
        post:post,
        showAll:showAll
    }
};

module.exports = CommentController;