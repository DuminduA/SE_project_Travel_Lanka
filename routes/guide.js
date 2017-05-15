
var express = require('express');
var router = express.Router();
var guide = require('../models/ServiceProvider');
var GuideController = require('../controllers/GuideController');




router.get('/hire',GuideController.get);

router.get('/available',GuideController.available);

router.get('/not_available',GuideController.not_available);

router.get('/notification/:id',GuideController.send_notification);

router.get('/accept/:id',GuideController.accept);

router.get('/reject/:id',GuideController.reject);






module.exports = router;

