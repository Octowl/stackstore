var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db');

var Review = db.model('review');

describe('Reviews model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

});
