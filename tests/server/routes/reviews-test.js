/* jshint node: true, mocha: true */

// Instantiate all models
process.env.NODE_ENV = 'testing';
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

var productsEndpoint = '/api/products/';
var reviewsEndpoint = '/reviews/';

describe('Reviews Route', function () {

    var app, Reviews, review1, review2, agent, Product, product1, product2;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Reviews = db.model('review');
        Product = db.model('product');
    });

    beforeEach('Create products', function () {

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

    beforeEach('Create a review', function () {
        return Promise.all([
            Reviews.create({
                    stars: 1,
                    comment: 'horrible product'
                }),
            Reviews.create({
                stars: 5,
                comment: 'cool'
            })
        ])
        .spread(function(_review1, _review2){
            review1 = _review1;
            review2 = _review2;
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

        beforeEach(function(){
            return Promise.all([
                product1.addReview(review1),
                product1.addReview(review2)
            ]);
        });

        it('gets all reviews for a product', function (done) {
            agent.get(productsEndpoint + product1.id + reviewsEndpoint)
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

        var product;

        it("creates a new review", function (done) {
            agent.post(productsEndpoint + product1.id + reviewsEndpoint)
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
                .then(function (r) {
                    expect(r).to.not.be.null;
                    expect(res.body.id).to.eql(r.id);
                    done();
                })
                .catch(done);
            });
        });

        it("associates review with product", function (done) {
            agent.post(productsEndpoint + product1.id + reviewsEndpoint)
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

    });

    describe("GET one by ID", function (done) {

        beforeEach(function(){
            return Promise.all([
                product1.addReview(review1),
                product1.addReview(review2)
            ]);
        });

        it("gets one review by ID", function (done) {
            agent.get(productsEndpoint + product1.id + reviewsEndpoint + review1.id)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.comment).to.equal(review1.comment);
                done()
            });
        });

    });

    describe("PUT one", function (done) {

        it("updates one existing review", function (done) {
            agent.put(productsEndpoint + product1.id + reviewsEndpoint + review1.id)
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

    });


    describe("DELETE one", function (done) {

        it("deletes one existing review", function (done) {
            agent.delete(productsEndpoint + product1.id + reviewsEndpoint + review1.id)
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

    });


});
