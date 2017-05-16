/**
 * Created by dumindu on 16/05/2017.
 */



var expect = require('chai').expect;
var mocha = require('mocha');

var post = require('../models/post');

var likes = require('../models/likes');


describe('post', function() {
    it('should be invalid if password is empty', function(done) {
        var m = new post();

        m.validate(function(err) {
            expect(err.errors.title).to.exist;
            done();
        });
    });
});


describe('post', function() {
    it('should be invalid if password is empty', function(done) {
        var m = new post();

        m.validate(function(err) {
            expect(err.errors.posted_by).to.exist;
            done();
        });
    });
});



describe('post', function() {
    it('should be invalid if password is empty', function(done) {
        var m = new post();

        m.validate(function(err) {
            expect(err.errors.owner_id).to.exist;
            done();
        });
    });
});


describe('post', function() {
    it('should be invalid if password is empty', function(done) {
        var m = new post();

        m.validate(function(err) {
            expect(err.errors.owner_type).to.exist;
            done();
        });
    });
});




describe('likes', function() {
    it('should be invalid if password is empty', function(done) {
        var m = new likes();

        m.validate(function(err) {
            expect(err.errors.post_id).to.exist;
            done();
        });
    });
});