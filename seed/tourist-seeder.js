/**
 * Created by dumindu on 25/04/2017.
 */

var tourist = require('../models/tourist');// require the blueprint i.e. the model of which we are working with
/*
importing mongose and connect to the databse is not enough. since these runs not in the normal app and this file 
does not run every time. so should import those settings here as well..

 */
var mongoose = require('mongoose'); 
mongoose.connect('localhost:27017/DB_TravelLanka');

var tourists = [
    new tourist({
        profile_imagepath:'C:\\Users\\dumindu\\Desktop\\Travel Lanka\\public\\image',
        name: "Dummy1",
        country: "Ethiopia",
        age: 19
    }),
    new tourist({
        profile_imagepath:'C:\\Users\\dumindu\\Desktop\\Travel Lanka\\public\\image',
        name: "Dummy2",
        country: "India",
        age: 91
    })


];
/*
 need to disconnrct after saving to the database. but we must make sure that it disconnects after the last object hasn saved.
* needed to take this precautions since the database is asynchronous so if it disconnects before all objects saved to the database.
*
* */

var done=0;
for (var i=0; i< tourists.length;i++){
    tourists[1].save(
        function (err,result) {
            done++;
            if(done==tourists.length){mongoose.disconnect();}
            
        }
    );
}