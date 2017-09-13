/**
 * Route for Guide
 */
var express = require('express');
var router = express.Router();
var guide = require('../models/ServiceProvider');
var ServiceProvider = require('../models/ServiceProvider');
var Notification = require('../models/notification');
var GuideController = require('../controllers/GuideController')(ServiceProvider,Notification);

/**
 * Route for get Guide
 */
router.get('/hire',GuideController.get);

/**
 * Route for show availability
 */
router.get('/available',GuideController.available);

/**
 * Route for show non-availability
 */
router.get('/not_available',GuideController.not_available);

/**
 * Route for send notification
 */
router.get('/notification/:id',GuideController.send_notification);

/**
 * Route for accept guide request
 */
router.get('/accept/:id',GuideController.accept);

/**
 * Route for reject guide request
 */
router.get('/reject/:id',GuideController.reject);

module.exports = router;
