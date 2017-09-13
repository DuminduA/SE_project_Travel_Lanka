/**
 * post database modal
 */

var mongoose = require('mongoose');
var postSchema = mongoose.Schema;

var schema = new postSchema(
    {
        title:{type:String,required:true},
        posted_by:{type:String,required:true},
        owner_id: {type:String,required:true},
        owner_type: {type:String,required:true},
        date:{type:String},
        time:{type:String},//
        image_path:{type:String},
        text:{type:String},
        Likes:{type:Number},
        Comments:{type:[{text:String,user:String}]},
        dislikes:{type:Number}
    }
);

module.exports=mongoose.model('Post',schema);
