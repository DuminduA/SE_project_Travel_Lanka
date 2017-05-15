/**
 * Created by dumindu on 12/05/2017.
 */
var express = require('express');
var router  =express.Router();

var comment_model = require('../models/comment');
var CommentController = require('../controllers/CommentController');

router.get('/post/:id',CommentController.post);


router.get('/show/:id',CommentController.showAll);





module.exports =router;