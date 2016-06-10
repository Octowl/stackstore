/* jshint node: true, mocha: true */

// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db');
var supertest = require('supertest');

describe('Cart Routes', function(done){
	var app, agent1, agent2, Product, product1, product2, OrderItem;

	beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Product = db.model('product');
        OrderItem = db.model('orderItem');
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
            .catch(done);	//FLOB
    });

    beforeEach('Create guest agents', function () {
        agent1 = supertest.agent(app);
        agent2 = supertest.agent(app);
    });

    afterEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

	function addProductToCart(agent, product) {
		return agent.get('/api/products/' + product.id + '/addToCart')
		.expect(200);
	}

	function removeProductFromCart(agent, product) {
		console.log("WOAH");	//remove -FLOB
		return agent.get('/api/products/' + product.id + '/removeFromCart')
		.expect(200);
	}

    function getItemsFromCart(cart) {
    	return OrderItem.findAll({
    		where: {orderId: cart.id}
    	});
    }

    it('adds item to cart', function(done){
    	addProductToCart(agent1, product1)
    	.end(function(err, res){
    		if(err) return done(err);
    		agent1.get('/cart')
    		.expect(200)
    		.end(function(err, res){
    			if(err) return done(err);
    			getItemsFromCart(res.body)
    			.then(function(items){
    				expect(items).to.have.length(1);
    				expect(items[0].productId).to.equal(product1.id);
    				done();
    			})
    			.catch(done);
    		});
    	});
    });

   it('adds multiple items to cart', function(done){
    	addProductToCart(agent1, product1)
    	.end(function(err, res){
    		if(err) return done(err);
    		addProductToCart(agent1, product2)
    		.end(function(err, res){
	    		if(err) return done(err);
	    		agent1.get('/cart')
	    		.expect(200)
	    		.end(function(err, res){
	    			if(err) return done(err);
	    			getItemsFromCart(res.body)
	    			.then(function(items){
	    				expect(items).to.have.length(2);
	    				expect(items[1].productId).to.equal(product2.id);
	    				done();
	    			})
	    			.catch(done);
	    		});
	    	});
    	});
    });

   it('can remove an item from the cart', function(done){
    	addProductToCart(agent1, product2)
    	.end(function(err, res){
    		if(err) return done(err);
    		removeProductFromCart(agent1, product2)
    		.end(function(err, res){
	    		if(err) return done(err);
	    		agent1.get('/cart')
	    		.expect(200)
	    		.end(function(err, res){
	    			if(err) return done(err);
	    			getItemsFromCart(res.body)
	    			.then(function(items){
	    				expect(items).to.have.length(0);
	    				done();
	    			})
	    			.catch(done);
	    		});
	    	});
    	});
    });

	it("creates different carts for different agents", function (done) {
		var cart1, cart2;
		agent1.get('/cart')
		.expect(200)
		.end(function(err, res){
			if(err) done(err);
			cart1 = res.body;
			agent2.get('/cart')
			.expect(200)
			.end(function(err, res){
				if(err) done(err);
				cart2 = res.body;
				expect(cart1.id).to.not.equal(cart2.id);
				done();
			});
		});
	});

	it("adds products to the right cart", function (done) {
		addProductToCart(agent1, product1)
    	.end(function(err, res){
    		if(err) return done(err);
    		addProductToCart(agent2, product2)
    		.end(function(err, res){
	    		if(err) return done(err);
	    		agent1.get('/cart')
	    		.expect(200)
	    		.end(function(err, res){
	    			if(err) return done(err);
	    			getItemsFromCart(res.body)
	    			.then(function(items){
	    				expect(items).to.have.length(1);
	    				expect(items[0].productId).to.equal(product1.id); //chai-things might be helpful -FLOB
	    				done();
	    			})
	    			.catch(done);
	    		});
	    	});
    	});
	});

	it("removes products from the right cart", function (done) {
		addProductToCart(agent1, product1)
    	.end(function(err, res){
    		if(err) return done(err);
    		addProductToCart(agent2, product2)
    		.end(function(err, res){
	    		if(err) return done(err);
				removeProductFromCart(agent1, product1)
				.end(function(err, res){
					agent1.get('/cart')
					.expect(200)
					.end(function(err, res){
						if(err) return done(err);
						getItemsFromCart(res.body)
						.then(function(items){
							expect(items).to.have.length(0);
						})
						.catch(done);
					});
					agent2.get('/cart')
					.expect(200)
					.end(function(err, res){
						if(err) return done(err);
						getItemsFromCart(res.body)
						.then(function(items){
							expect(items).to.have.length(1);
							done();
						});
					});
				});
	    	});
    	});
	});

});
