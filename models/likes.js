/**
 * Created by dumindu on 15/05/2017.
 */

var mongoose = require('mongoose');

var schma = mongoose.Schema;

var likeSchema = new schma({
    
    post_id:{type:String,required:true},
    user_id:{type:String},
    like:{type:Boolean},
    Dislike:{type:Boolean}
    
    
    
    
    
    
});



module.exports = mongoose.model('Likes',likeSchema);