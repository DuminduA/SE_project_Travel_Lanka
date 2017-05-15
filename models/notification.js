
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var notification = new schema({

    tourist_id:{type:String,required:true},
    tourist_name:{type:String,required:true},
    telephone: {type:String,required:true},
    guide_id: {type:String,required:true},
    guide_name: {type:String},
    status: {type:String},
    date:{type:String},
    time:{type:String}
    
});

module.exports = mongoose.model('Notification',notification);