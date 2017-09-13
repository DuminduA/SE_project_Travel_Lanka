/**
 * likes database modal
 */

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var likeSchema = new schema(
    {
    post_id:{type:String,required:true},
    user_id:{type:String},
    like:{type:Boolean},
    Dislike:{type:Boolean}
    }
);

module.exports = mongoose.model('Likes',likeSchema);
