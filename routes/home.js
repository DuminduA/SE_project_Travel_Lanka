var express = require('express');
var router = express.Router();




router.get('/main', function(req, res, next) {
    res.render('home/home', { title: 'Home',layout:'layout2' });
});



module.exports = router;