/**
 * Created by dumindu on 16/05/2017.
 */
/**
 * Created by dumindu on 16/05/2017.
 */


var expect = require('chai').expect;
var mocha = require('mocha');

var ServiceProvider = require('../models/ServiceProvider');

var Notification = require('../models/notification');

var tourist = require('../models/tourist');

describe('ServiceProvider', function() {
    it('should be invalid if password is empty', function(done) {
        var m = new ServiceProvider();

        m.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});
describe('ServiceProvider', function() {
    it('should be invalid if email is empty', function(done) {
        var m = new ServiceProvider();

        m.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});

describe('Notification', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new Notification();

        m.validate(function(err) {
            expect(err.errors.tourist_id).to.exist;
            done();
        });
    });
});

describe('Notification', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new Notification();

        m.validate(function(err) {
            expect(err.errors.tourist_name).to.exist;
            done();
        });
    });
});

describe('Notification', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new Notification();

        m.validate(function(err) {
            expect(err.errors.telephone).to.exist;
            done();
        });
    });
});


describe('Notification', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new Notification();

        m.validate(function(err) {
            expect(err.errors.guide_id).to.exist;
            done();
        });
    });
});


describe('tourist', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new tourist();

        m.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});


describe('tourist', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new tourist();

        m.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});




    
    

