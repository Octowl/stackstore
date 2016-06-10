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

    var app, User, Product, product1, product2, agent;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Product = db.model('product');
        User = db.model('user');
    });
    

    beforeEach('Create a product', function (done) {
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
                done();
            })
            .catch(done);
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

        var user, loggedInAgent;
        var userInfo = {
                firstName: 'Matt',
                lastName : 'Landers',
                email : 'mattlanders@smartpeople.com',
                password : 'Jennaisthebestandsmartest'
            };

        beforeEach('Create a user', function (done) {
            return User.create(userInfo)
                .then(function (u) {
                    user = u;
                    done();
                })
                .catch(done);
        });

        beforeEach('Log in user', function(done){
            loggedInAgent = supertest.agent(app);
            return loggedInAgent.post('/login').send(userInfo)
            .end(function(err, res){
                done();
            });
        });

        it("creates a new product", function (done) {
            loggedInAgent.post('/api/products/')
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
                    expect(res.body.id).to.eql(toPlainObject(p).id);
                    done();
                })
                .catch(done);
            });
        });

        it("associates product with logged in user", function (done) {
            loggedInAgent.post('/api/products/')
            .send({
                name: "Shagel",
                description: "gel and things",
                price: 4.5,
                inventory: 8
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.userId).to.equal(user.id);
                done();
            });
        });


        it("only logged in users can create products", function (done) {
            agent.post('/api/products/')
            .send({
                name: "Shagel",
                description: "gel and things",
                price: 4.5,
                inventory: 8
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

        it("gets one that doesnt exist", function (done) {
            agent.get('/api/products/123456')
            .expect(404)
            .end(done);
        });

        it("gets one with an invalid ID", function (done) {
            agent.get('/api/products/hfdjkslhfiul')
            .expect(500)
            .end(done);
        });

    });

    describe("PUT one", function (done) {

        it("updates one existing product", function (done) {
            agent.put('/api/products/' + product1.id)
            .send({
                name : 'Shagel 2'
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

        it("updates one that doesnt exist", function (done) {
            agent.put('/api/products/123456')
            .send({
                name : 'Shagel 2'
            })
            .expect(404)
            .end(done);
        });

        it("updates one with an invalid ID", function (done) {
            agent.put('/api/products/hfdjkslhfiul')
            .send({
                name : 'Shagel 2'
            })
            .expect(500)
            .end(done);
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

        it("deletes one that doesnt exist", function (done) {
            agent.delete('/api/products/123456')
            .expect(404)
            .end(done);
        });

        it("deletes one with an invalid ID", function (done) {
            agent.delete('/api/products/hfdjkslhfiul')
            .expect(500)
            .end(done);
        });

    });


});
