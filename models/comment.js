/**
 * Created by dumindu on 12/05/2017.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentschema = new Schema({
    
    text:{type:String,required:true},
    owner_id:{type:String,required:true},
    owner_type:{type:String,required:true},
    post_id:{type:String,required:true}
    
    
    
    
});
    

module.exports=mongoose.model('Comments',commentschema);
    
    
    
    
