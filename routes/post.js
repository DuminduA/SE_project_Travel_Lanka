/**
 * Created by dumindu on 11/05/2017.
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');
var posts = require('../models/post');
var PostController = require('../controllers/PostController');

var uploading = multer({
    dest:  'public/uploads/',
    limits: {fileSize: 8000000, files:1},
});



router.post('/upload' ,uploading.single('image'),PostController.createpost );

router.get('/delete/:id',PostController.deletepost);


router.get('/like/:id',PostController.like);


router.get('/dislike/:id',PostController.dislike);


module.exports = router;

