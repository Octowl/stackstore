var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var db = require('../../../server/db');
var Order = db.model('order');

describe('Orders model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

});
