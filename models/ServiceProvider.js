/**
 * Service Provider database modal
 */

var mongoose = require('mongoose'); //import mongoose
var Schema = mongoose.Schema; // use the schema in mongoose
var bcrypt = require('bcrypt-nodejs');

/**
 * one schema is for all service providers since mongo db does not have tables concept. so data wont get redundant or inconsistant.
 */
var schema  = new Schema({
    user_type:{type:String},
    profile_imagepath: {type:String},
    name: {type:String},
    telephone: {type:String},
    password: {type:String,required:true},
    email:{type:String,required:true},
    AddressLine1:{type:String},
    AddressLine2:{type:String},
    AddressLine3:{type:String},
    AddressLine1:{type:String},
    nationality:{type:String},
    
    // special for guide
    sex:{type:String},              
    age: {type:Number},
    available: {type:Boolean}
});

schema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null) // get the encrypted password and have a salt of 5 characters
};

schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};// check hash is same the given password, compare synchronously

//blueprints of the tourists data model
module.exports=mongoose.model('ServiceProvider',schema); // import functionality of this file to other files as well
