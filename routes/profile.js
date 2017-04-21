var express = require('express');
var router = express.Router();





router.get('/profile', function(req, res, next) {
    res.render('profile/profile', { title: 'Express' ,layout:'layout2'});
});










module.exports = router;