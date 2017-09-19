/**
 * Created by dumindu on 16/05/2017.
 */


var expect = require('chai').expect;
var mocha = require('mocha');

var comments = require('../models/comment');

describe('comment', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new comments();

        m.validate(function(err) {
            expect(err.errors.text).to.exist;
            done();
        });
    });
});

describe('comment', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new comments();

        m.validate(function(err) {
            expect(err.errors.owner_id).to.exist;
            done();
        });
    });
});

describe('comment', function() {
    it('should be invalid if text is empty', function(done) {
        var m = new comments();

        m.validate(function(err) {
            expect(err.errors.owner_type).to.exist;
            done();
        });
    });
});





    
    

