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

describe('Reviews Route', function () {

    var app, Reviews, review1, review2, agent, Product;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Reviews = db.model('reviews');
        Product = db.model('product');
    });


    beforeEach('Create a review', function (done) {
        return Reviews.create({
                stars: 1,
                comment: 'horrible product'
            })
            .then(function (r) {
                review1 = r;
                return Reviews.create({
                    stars: 5,
                    comment: 'cool'
                });
            })
            .then(function (r) {
                review2 = r;
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

        it('gets all reviews', function (done) {
            agent.get('/api/reviews')
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

        var product1;

        beforeEach('Create a product', function (done) {
            return Product.create({
                    name: 'cigarets',
                    description: 'marlboro',
                    price: 40,
                    inventory: 50
                })
                .then(function (p) {
                    product1 = p;
                    done();
                })
                .catch(done);
        });

        it("creates a new review", function (done) {
            agent.post('/api/reviews/' + product1.id)
            .send({
                stars: 2,
                comment: 'bad thing'
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.comment).to.equal("bad thing");
                expect(res.body.id).to.exist;
                Reviews.findById(res.body.id)
                .then(function (p) {
                    expect(p).to.not.be.null;
                    expect(res.body.id).to.eql(toPlainObject(p).id);
                    done();
                })
                .catch(done);
            });
        });

        it("associates review with product", function (done) {
            agent.post('/api/reviews/' + product1.id)
            .send({
                stars: 2,
                comment: 'bad thing'
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                Reviews.findById(res.body.id)
                .then(function (r) {
                    expect(r).to.not.be.null;
                    expect(r.productId).to.eql(product1.id);
                    done();
                })
                .catch(done);
            });
        });

        it("posts one that doesnt exist", function (done) {
            agent.post('/api/reviews/123456')
            .expect(404)
            .end(done);
        });

        it("posts one with an invalid ID", function (done) {
            agent.post('/api/reviews/hfdjkslhfiul')
            .expect(500)
            .end(done);
        });

    });

    describe("GET one by ID", function (done) {

        it("gets one review by ID", function (done) {
            agent.get('/api/reviews/' + review1.id)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.comment).to.equal(review1.comment);
                done()
            });
        });

        it("gets one that doesnt exist", function (done) {
            agent.get('/api/reviews/123456')
            .expect(404)
            .end(done);
        });

        it("gets one with an invalid ID", function (done) {
            agent.get('/api/reviews/hfdjkslhfiul')
            .expect(500)
            .end(done);
        });

    });

    describe("PUT one", function (done) {

        it("updates one existing review", function (done) {
            agent.put('/api/reviews/' + review1.id)
            .send({
                stars: 3
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.stars).to.equal(3);
                expect(res.body.id).to.exist;
                Reviews.findById(res.body.id)
                .then(function (p) {
                    expect(p).to.not.be.null;
                    expect(res.body.id).to.eql(toPlainObject(p).id);
                    done();
                })
                .catch(done);
            });
        });

        it("updates one that doesnt exist", function (done) {
            agent.put('/api/reviews/123456')
            .send({
                stars: 1
            })
            .expect(404)
            .end(done);
        });

        it("updates one with an invalid ID", function (done) {
            agent.put('/api/reviews/hfdjkslhfiul')
            .send({
                stars: 1
            })
            .expect(500)
            .end(done);
        });

    });


    describe("DELETE one", function (done) {

        it("deletes one existing review", function (done) {
            agent.delete('/api/reviews/' + review1.id)
            .expect(204)
            .end(function (err, res) {
                if (err) return done(err);
                Reviews.findById(review1.id)
                .then(function (r) {
                    expect(r).to.be.null;
                    done();
                })
                .catch(done);
            });
        });

        it("deletes one that doesnt exist", function (done) {
            agent.delete('/api/reviews/123456')
            .expect(404)
            .end(done);
        });

        it("deletes one with an invalid ID", function (done) {
            agent.delete('/api/reviews/hfdjkslhfiul')
            .expect(500)
            .end(done);
        });

    });


});
