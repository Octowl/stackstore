var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-cove';
var db = new Sequelize(dbURI, {
    logging: false
});
require('../../../server/db/models/user')(db);

var supertest = require('supertest');

describe('Users Route Tests', function () {

    var app, User;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

	var userInfo = {
		firstName: 'joe',
		lastName: 'schmo',
		email: 'joe@gmail.com',
		password: 'shoopdawoop'
	};

	beforeEach('Create a user', function (done) {
		return User.create(userInfo).then(function (user) {
            done();
        }).catch(done);
	});

	describe('Should be able to access profile while logged in', function(){

		var loggedInAgent;
		beforeEach('Create loggedIn user agent and authenticate', function () {
			loggedInAgent = supertest.agent(app);
		});

		it('The user api route retrieves the proper user.', function(done){
    		loggedInAgent.get('/api/users/1').expect(200)
    		.end(function(err, response){
    			if(err) return done(err);
    			expect(response.body.firstName).to.equal(userInfo.firstName);
    			done();
    		})
    			// user.firstName).to.equal(userInfo.firstName);
    			// done();
    	})
	});

	describe('Should not be able to do stuff while not logged in', function(){
		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});	
	})


});