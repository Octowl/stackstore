/* jshint node: true, mocha: true */

// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

process.env.NODE_ENV = 'testing';

var db = require('../../../server/db');

var supertest = require('supertest');

function toPlainObject(instance) {
    return instance.get({
        plain: true
    });
}

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

    describe("GET all", function () {

        it('gets all products', function (done) {
            agent.get('/api/products')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(2);
                    done();
                });
        });

    });

    describe("POST one", function (done) {

        it("creates a new product", function (done) {
            agent.post('/api/products')
            .send({
                name: "Shagel",
                description: "gel and things",
                price: 4.5,
                inventory: 8
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.description).to.equal("gel and things");
                expect(res.body.id).to.exist;
                Product.findById(res.body.id)
                .then(function (p) {
                    expect(p).to.not.be.null;
                    expect(res.body).to.eql(toPlainObject(p));
                    done();
                })
                .catch(done);
            });
        });

    });


});
