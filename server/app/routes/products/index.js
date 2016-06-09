/* jshint node:true*/

'use strict';


var db = require('../../../db');
var Product = db.model('product');
var Reviews = db.model('reviews');
var Location = db.model('location');
var router = require('express').Router();

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
	var myProduct;
	Product.create(req.body.productData)
	.then(function(createdProduct){
		myProduct = createdProduct;
	})
	.then(function(){
		return Location.findOne({
			where:{
				name: req.body.location
			}
		})
	})
	.then(function(foundLocation){
		return myProduct.setLocation(foundLocation)
	})
	.then(function(updatedProduct){
		res.status(201).send(updatedProduct);		
	})
	.catch(next);
});

router.get('/:id/addToCart', function(req, res, next){
	req.cart.addProduct(req.productInstance)
	.then(function(updatedCart){
		res.send(updatedCart);
	});
});

router.get('/:id/removeFromCart', function(req, res, next){
	req.cart.removeProduct(req.productInstance)
	.then(function(updatedCart){
		res.send(updatedCart);
	});
});

router.get('/:id', function(req, res, next){
	res.send(req.productInstance);
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
