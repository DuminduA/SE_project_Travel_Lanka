/**
 * comment database modal
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema(
    {
    text:{type:String,required:true},
    owner_id:{type:String,required:true},
    owner_type:{type:String,required:true},
    post_id:{type:String,required:true}
    }
);

module.exports=mongoose.model('Comments',commentSchema);
