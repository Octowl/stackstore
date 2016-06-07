// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

process.env.NODE_ENV = 'testing';

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Products Route', function () {

    var app, Product, product1, product2, agent;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Product = db.model('product');
    });

    beforeEach('Create a product', function () {
        return Product.create({
                name: 'cigarets',
                description: 'marlboro',
                price: 40,
                inventory: 50
            })
            .then(function (p) {
                product1 = p;
                return Product.create({
                    name: 'shagel',
                    description: 'shagel vanilla',
                    price: 5,
                    inventory: 120
                });
            })
            .then(function (p) {
                product2 = p;
            })
            .catch(console.err);
    });

    beforeEach('Create guest agent', function () {
        agent = supertest.agent(app);
    });

    afterEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    it('GET all products', function (done) {
        agent.get('/api/products')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                expect(res.body).to.have.length(2);
                done();
            });
    });

    // it("POST creates a new product", function (done) {
    //
    // });

});
