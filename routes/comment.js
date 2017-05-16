/**
 * Created by dumindu on 12/05/2017.
 */
var express = require('express');
var router  =express.Router();

var comment_model = require('../models/comment');
var posts = require('../models/post');
var notifications = require('../models/notification');
var CommentController = require('../controllers/CommentController')(comment_model,posts,notifications);

router.get('/post/:id',CommentController.post);


router.get('/show/:id',CommentController.showAll);





module.exports =router;