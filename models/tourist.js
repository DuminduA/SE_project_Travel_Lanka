/**
 * Tourist database modal
 */

var mongoose = require('mongoose'); //import mongoose
var Schema = mongoose.Schema; // use the schema in mongoose
var bcrypt = require('bcrypt-nodejs');

var schema  = new Schema(
    {
        user_type :{type:String},
        profile_imagepath: {type:String},
        name: {type:String},
        password: {type:String,required:true},
        country: {type:String},
        age: {type:Number},
        email:{type:String,required:true}
    }
);

/**
 * Method toget the encrypted password and have a salt of 5 characters
 * @param password
 * @returns {*}
 */
schema.methods.encryptPassword = function (password) {
        return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

/**
 * Method to check hash is same the given password, compare synchronously
 * @param password
 * @returns {*}
 */
schema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
};

module.exports=mongoose.model('Tourist',schema); // import functionality of this file to other files as well
//blueprints of the tourists data model
