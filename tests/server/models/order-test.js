var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
process.env.NODE_ENV = 'testing';   //can be in the gulp task - FLOB
var db = require('../../../server/db');
var Order = db.model('order');

describe('Orders model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

});
