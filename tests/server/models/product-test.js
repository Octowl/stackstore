var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var db = require('../../../server/db');
var Product = db.model('product');

describe('Product model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

});
