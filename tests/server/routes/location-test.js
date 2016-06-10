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

describe('Locations Route', function () {

    var app, Location, location1, location2, agent;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {  
        app = require('../../../server/app')(db);
        Location = db.model('location');
    });

    beforeEach('Create a location', function (done) { //bulk create -FLOB
        return Location.create({        //don't need done with a return. -FLOB
                name: "Paris",
                latitude: 48.8566,
                longitude: 2.3522
            })
            .then(function (l) {
                location1 = l;
                return Location.create({
                    name: "London",
                    latitude: 51.5074,
                    longitude: 0.1278
                });
            })
            .then(function (l) {
                location2 = l;
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

        it('gets all locations', function (done) {
            agent.get('/api/locations')
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

        it("creates a new location", function (done) {
            agent.post('/api/locations')
                .send({
                    name: "New York",
                    latitude: 40.7128,
                    longitude: 74.0059
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal("New York");
                    expect(res.body.id).to.exist;
                    Location.findById(res.body.id)
                        .then(function (p) {
                            expect(p).to.not.be.null;
                            expect(res.body.id).to.eql(toPlainObject(p).id);    //p.id - FLOB
                            done();
                        })
                        .catch(done);
                });
        });

    });

    describe("GET one by ID", function (done) {

        it("gets one location by ID", function (done) {
            agent.get('/api/locations/' + location1.id)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.description).to.equal(location1.description);
                    done()
                });
        });

        it("gets one that doesnt exist", function (done) {      //unneeded -FLOB
            agent.get('/api/locations/123456')
                .expect(404)
                .end(done);
        });

        it("gets one with an invalid ID", function (done) { 
            agent.get('/api/locations/hfdjkslhfiul')
                .expect(500)
                .end(done);
        });

    });

    describe("PUT one", function (done) {

        it("updates one existing location", function (done) {
            agent.put('/api/locations/' + location1.id)
                .send({
                    name: 'Shageland'
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal("Shageland");
                    expect(res.body.id).to.exist;
                    Location.findById(res.body.id)
                        .then(function (p) {
                            expect(p).to.not.be.null;
                            expect(res.body.id).to.eql(toPlainObject(p).id);
                            done();
                        })
                        .catch(done);
                });
        });

        it("updates one that doesnt exist", function (done) {
            agent.put('/api/locations/123456')
                .send({
                    name: 'Shageland'
                })
                .expect(404)
                .end(done);
        });

        it("updates one with an invalid ID", function (done) {
            agent.put('/api/locations/hfdjkslhfiul')
                .send({
                    name: 'Shageland'
                })
                .expect(500)
                .end(done);
        });

    });


    describe("DELETE one", function (done) {

        it("deletes one existing location", function (done) {
            agent.delete('/api/locations/' + location1.id)
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    Location.findById(location1.id)
                        .then(function (p) {
                            expect(p).to.be.null;
                            done();
                        })
                        .catch(done);
                });
        });

        it("deletes one that doesnt exist", function (done) {
            agent.delete('/api/locations/123456')
                .expect(404)
                .end(done);
        });

        it("deletes one with an invalid ID", function (done) {
            agent.delete('/api/locations/hfdjkslhfiul')
                .expect(500)
                .end(done);
        });

    });


});
