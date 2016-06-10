var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-cove';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/order')(db);

var Order = db.model('order');

describe('Orders model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

});
