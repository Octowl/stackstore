var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db');
var Location = db.model('location');

describe('Location model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    var location, locObj;
    beforeEach('Add Locations', function (done) {
        locObj = {
            name: "Paris",
            latitude: 48.8566,
            longitude: 2.3522
        };
       location = Location.build(locObj);
    });
    //
    // describe('coordinates virtual', function() {
    //     it("returns a coordinate array", function () {
    //         var coordinates = location.coordinates;
    //         expect(coordinates).to.be.instanceof(Object);
    //         expect(coordinates.)
    //     });
    // });

});
