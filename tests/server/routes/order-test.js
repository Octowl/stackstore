var expect = require('chai').expect;

var Sequelize = require('sequelize');

process.env.NODE_ENV = 'testing'; //not needed here if in Gulp -FLOB

var db = require('../../../server/db');

var supertest = require('supertest');
var Promise = require('bluebird');

function toPlainObject(instance) {
    return instance.get({
        plain: true
    });
}

describe('Orders Route', function () {

    var app, Orders, order1, order2, agent;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Orders = db.model('order');
    });

    beforeEach('Create an order', function () {
        return Promise.all([
            Orders.create({
                active: true
            }),
            Orders.create({
                active: false
            })
        ])
        .spread(function(_order1, _order2){
            order1 = _order1;
            order2 = _order2;
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

    describe('GET all', function () {

        it('gets all orders', function (done) {
            agent.get('/api/orders')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(3);
                    done();
                });
        });

    });

    describe('GET one order by ID', function () {

        it('gets one order by ID', function (done) {
            agent.get('/api/orders/' + order1.id)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.active).to.equal(order1.active);
                    done();
                });
        });

    });

    describe('POST one order', function (done) {

        it('creates a new order', function (done) {
            agent.post('/api/orders')
                .send({
                    active: false
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.active).to.equal(false);
                    expect(res.body.id).to.exist;
                    Orders.findById(res.body.id)
                        .then(function (o) {
                            expect(o).to.not.be.null;
                            expect(res.body.id).to.eql(toPlainObject(o).id);
                            done();
                        })
                        .catch(done);
                })
        })

    })

    describe("PUT one", function (done) {

        it("updates one existing order", function (done) {
            agent.put('/api/orders/' + order1.id)
                .send({
                    active: false
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.active).to.equal(false);
                    expect(res.body.id).to.exist;
                    Orders.findById(res.body.id)
                        .then(function (o) {
                            expect(o).to.not.be.null;
                            expect(res.body.id).to.eql(toPlainObject(o).id);
                            done();
                        })
                        .catch(done);
                });
        });

    });

    describe("DELETE one", function (done) {

        it("deletes one existing order", function (done) {
            agent.delete('/api/orders/' + order1.id)
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    Orders.findById(order1.id)
                        .then(function (o) {
                            expect(o).to.be.null;
                            done();
                        })
                        .catch(done);
                });
        });

    });



});
