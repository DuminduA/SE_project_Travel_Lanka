/**
 * Controller method for Guilds
 * 
 * @param ServiceProvider
 * @param Notification
 * @returns {{get: get, available: available, not_available: not_available, send_notification: send_notification, accept: accept, reject: reject}}
 * @constructor
 */

var GuideController = function (ServiceProvider,Notification) {

    /**
     * Method to get a Guide
     * 
     * @param req
     * @param res
     */
    var get = function (req,res) {
        ServiceProvider.find({user_type:'Guide'},function (err,sp) {
            if(err){
                res.send(err);
            }
            res.render('guide/hireguide',{layout:'layout2',guide:sp});
        })

    };

    /**
     * Method to check whether guide is available
     * 
     * @param req
     * @param res
     */
    var available = function (req,res) {
        ServiceProvider.findById(req.user._id,function (err,user) {
                if(err){
                    res.send(err);}
                user.available= true;
                user.save(function (err,result) {
                    if (err){res.send(err);}
                });
                res.redirect('/profile/profile');
            }
        );
    };

    /**
     * Method to check guide is not available
     * 
     * @param req
     * @param res
     */
    var not_available = function (req,res) {
        ServiceProvider.findById(req.user._id,function (err,user) {
                if(err){res.send(err);}
                user.available= false;
                user.save(function (err,result) {
                    if (err){res.send(err);}
                });
                res.redirect('/profile/profile');
            }
        );
    };

    /**
     * Method to send notifications to tourists
     * 
     * @param req
     * @param res
     */
    var send_notification = function (req,res) {
        var notification = new Notification();
        var date = new Date().getDate();
        var Month = new Date().getMonth();
        var Year = new Date().getFullYear();
        var Hours = new Date().getHours();
        var Minutes = new Date().getMinutes();
        var Seconds = new Date().getSeconds();

        notification.guide_id = req.params.id;
        notification.guide_name = req.query.guide_name;
        notification.tourist_id = req.user._id;
        notification.tourist_name = req.user.name;
        notification.telephone = req.query.tele;
        notification.date = date.toString() + "/ " + Month.toString() + "/ " + Year.toString();
        notification.time =Hours.toString() + " Hr: " + Minutes.toString() + "Min: " + Seconds.toString() + "Secs";
        notification.status = "Pending";
        
        notification.save(function (err,result) {
            if(err){return res.send(err);}
            return res.redirect('/guide/hire');
        });
    };

    /**
     * Method to accept Guide request(which the tourist send to the guide)
     * 
     * @param req
     * @param res
     */
    var accept = function (req,res) {
        console.log(req.params);
        var notification_id = req.params.id;

        Notification.findById(notification_id,function (err,result) {
            if(err){return res.send(err);}
            result.status = "Accept";
            result.save(function (err) {
                if(err){return res.send(err);}
            });
            res.redirect('/profile/profile');
        });
    };

    /**
     * Method to reject the Guide Request(which the tourist send to the guide)
     * @param req
     * @param res
     */
    var reject = function (req,res) {
        console.log(req);
        var notification_id = req.params.id;

        Notification.findById(notification_id,function (err,result) {
            if(err){return res.send(err);}
            result.status = "Reject";
            result.save(function (err) {
                if(err){return res.send(err);}
            });
            res.redirect('/profile/profile');
        });
    };
        return {
            get:get,
            available:available,
            not_available:not_available,
            send_notification:send_notification,
            accept:accept,
            reject:reject
        }
};

module.exports = GuideController;
