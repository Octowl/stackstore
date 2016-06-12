/* jshint node: true, mocha: true */

// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');
var Promise = require('bluebird');

function toPlainObject(instance) {
    return instance.get({
        plain: true
    });
}

describe('Products Route', function () {

    var app, Product, product1, product2, agent, Location, User;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Product = db.model('product');
        Location = db.model('location');
        User = db.model('user');
    });


    beforeEach('Create a product', function () {

        return Promise.all([
                Product.create({
                    name: 'cigarets',
                    description: 'marlboro',
                    price: 40,
                    inventory: 50
                }),
                Product.create({
                    name: 'shagel',
                    description: 'shagel vanilla',
                    price: 5,
                    inventory: 120
                })
            ])
            .spread(function (_product1, _product2) {
                product1 = _product1;
                product2 = _product2;
            });

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

        var location, user, loggedInAgent;
        var userInfo = {
            firstName: 'Matt',
            lastName: 'Landers',
            email: 'mattlanders@smartpeople.com',
            password: 'Jennaisthebestandsmartest'
        };

        beforeEach('Create a location', function () {
            return Location.create({
                    name: "Paris",
                    latitude: 48.8566,
                    longitude: 2.3522
                })
                .then(function (l) {
                    location = l;
                });
        });

        beforeEach('Create a user', function () {
            return User.create(userInfo)
                .then(function (u) {
                    user = u;
                });
        });

        beforeEach('Log in user', function (done) {
            loggedInAgent = supertest.agent(app);
            return loggedInAgent.post('/login').send(userInfo)
                .end(function (err, res) {
                    done();
                });
        });

        it("creates a new product", function (done) {
            loggedInAgent.post('/api/products/')
                .send({
                    product: {
                        name: "Shagel",
                        description: "gel and things",
                        price: 4.5,
                        inventory: 8
                    },
                    location: location.id
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.description).to.equal("gel and things");
                    expect(res.body.id).to.exist;
                    Product.findById(res.body.id)
                        .then(function (p) {
                            expect(p).to.not.be.null;
                            expect(res.body.id).to.eql(toPlainObject(p).id);
                            done();
                        })
                        .catch(done);
                });
        });

        it("associates product with logged in user", function (done) {
            loggedInAgent.post('/api/products/')
                .send({
                    product: {
                        name: "Shagel",
                        description: "gel and things",
                        price: 4.5,
                        inventory: 8
                    },
                    location: location.id
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.userId).to.equal(user.id);
                    done();
                });
        });

        it("associates the product with a location", function () {
            loggedInAgent.post('/api/products')
            .send({
                product: {
                    name: "Shagel",
                    description: "gel and things",
                    price: 4.5,
                    inventory: 8
                },
                location: location.id
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.locationId).to.equal(location.id);
                done();
            });
        });


        it("only logged in users can create products", function (done) {
            agent.post('/api/products/')
                .send({
                    product: {
                        name: "Shagel",
                        description: "gel and things",
                        price: 4.5,
                        inventory: 8
                    },
                    location: location.id
                })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });

    describe("GET one by ID", function (done) {

        it("gets one product by ID", function (done) {
            agent.get('/api/products/' + product1.id)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.description).to.equal(product1.description);
                    done();
                });
        });

    });

    describe("PUT one", function (done) {

        it("updates one existing product", function (done) {
            agent.put('/api/products/' + product1.id)
                .send({
                    name: 'Shagel 2'
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal("Shagel 2");
                    expect(res.body.id).to.exist;
                    Product.findById(res.body.id)
                        .then(function (p) {
                            expect(p).to.not.be.null;
                            expect(res.body.id).to.eql(toPlainObject(p).id);
                            done();
                        })
                        .catch(done);
                });
        });

    });


    describe("DELETE one", function (done) {

        it("deletes one existing product", function (done) {
            agent.delete('/api/products/' + product1.id)
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    Product.findById(product1.id)
                        .then(function (p) {
                            expect(p).to.be.null;
                            done();
                        })
                        .catch(done);
                });
        });

    });


});
