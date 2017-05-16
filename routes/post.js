/**
 * Created by dumindu on 11/05/2017.
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');


var posts = require('./../models/post');
var notifications = require('./../models/notification');
var likes = require('./../models/likes');
var comments = require('./../models/comment');


var PostController = require('../controllers/PostController')(posts,notifications,likes,comments);

var uploading = multer({
    dest:  'public/uploads/',
    limits: {fileSize: 8000000, files:1},
});



router.post('/upload' ,uploading.single('image'),PostController.createpost );

router.get('/delete/:id',PostController.deletepost);


router.get('/like/:id',PostController.like);
router.get('/ajax/like/:id',PostController.like);


router.get('/dislike/:id',PostController.dislike);


module.exports = router;

