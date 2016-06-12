/* jshint node:true*/

'use strict';


var db = require('../../../db');
var Product = db.model('product');
var Reviews = db.model('reviews');
var User = db.model('user');
var Location = db.model('location')
var OrderItem = db.model('orderItem');

var router = require('express').Router();
var _ = require('lodash');

module.exports = router;

router.param('id', function (req, res, next, theId) {
    Product.findById(theId)
        .then(function (foundProduct) {
            if (!foundProduct) res.sendStatus(404);
            else req.productInstance = foundProduct;
            next();
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    Product.findAll({})
        .then(function (products) {
            res.send(products);
        })
        .catch(next);
});

router.post('/', function(req, res, next){
    if(!req.user) res.sendStatus(401);
    else {
        Product.create(req.body)
        .then(function(createdProduct){
            return createdProduct.setUser(req.user);
        })
        .then(function(createdProduct){
            res.status(201).send(createdProduct);
        })
        .catch(next);
    }
});

function isItemInCart(cart, product) {
	return cart.getProducts()
	.then(function(products){
		return _.any(products,product);
	})
}

router.get('/:id/addToCart', function(req, res, next){
	isItemInCart(req.cart,req.productInstance)
	.then(function(hasProduct){
		if(hasProduct) {
			return OrderItem.findOne({
				where : {
					orderId : req.cart.id,
					productId : req.productInstance.id
				}
			})
			.then(function(foundItem) {
				return foundItem.update({
					quantity : foundItem.quantity + 1 // turn this into an instance method
				})
			})
			.then(function(){
				return req.cart;
			})
		} else {
			return req.cart.addProduct(req.productInstance)
		}
	})
	.then(function(updatedCart){
		res.send(updatedCart);
	})
	.catch(next);
});

router.get('/:id/removeFromCart', function(req, res, next){
	req.cart.removeProduct(req.productInstance)
	.then(function(){
		res.send(req.cart);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	Product.findOne({
		where: { id: req.params.id },
		include: [{ model: User, required: true}, { model: Location, required: true}]
	})
    .then(function (foundProduct) {
        if (!foundProduct) res.sendStatus(404);
        else res.send(foundProduct);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next){
	req.productInstance.update(req.body)
	.then(function(updatedProduct){
		res.send(updatedProduct);
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next){
	req.productInstance.destroy()
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
