/**
 * Routes for comment.
 */
var express = require('express');
var router  =express.Router();

var comment_model = require('../models/comment');
var posts = require('../models/post');
var notifications = require('../models/notification');
var CommentController = require('../controllers/CommentController')(comment_model,posts,notifications);

/**
 * Route for show post
 */
router.get('/post/:id',CommentController.post);

/**
 * Route for show All posts
 */
router.get('/show/:id',CommentController.showAll);

module.exports = router;
