var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/product')(db);

var Product = db.model('product');

describe('Product model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    });

});
