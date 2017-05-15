/**
 * Created by dumindu on 25/04/2017.
 */

var mongoose = require('mongoose'); //import mongoose

var Schema = mongoose.Schema; // use the schema in mongoose

var bcrypt = require('bcrypt-nodejs');




var schema  = new Schema({
        user_type :{type:String},
        profile_imagepath: {type:String},
        name: {type:String},
        password: {type:String,required:true},
        country: {type:String},
        age: {type:Number},
        email:{type:String,required:true}
        

});

schema.methods.encryptPassword = function (password) {
        return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null) // get the encrypted password and have a salt of 5 characters
};

schema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
};// check hash is same the given password, compare synchronously


module.exports=mongoose.model('Tourist',schema); // import functionality of this file to other files as well


    //blueprints of the tourists data model
