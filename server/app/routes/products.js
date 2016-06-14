/* jshint node:true*/

'use strict';

var db = require('../../db');
var Product = db.model('product');
var OrderItem = db.model('orderItem');
var Location = db.model('location');
var Review = db.model('review');
var User = db.model('user');
var Location = db.model('location');
var Auth = require('./auth');

var router = require('express').Router();

module.exports = router;

router.param('id', function (req, res, next, theId) {
    Product.findById(theId)
        .then(function (foundProduct) {
            if (!foundProduct) return res.sendStatus(404);
            else req.productInstance = foundProduct;
            next();
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    Product.findAll({
            include: [{
                model: Location
            }]
        })
        .then(function (products) {
            res.send(products);
        })
        .catch(next);
});

router.get('/:id/reviews', function (req, res, next) {
    console.log('made it to routes')
    Review.findAll({
            where : {
                productId : req.productInstance.id
            },
            include: [{
                    model: User
            }]
        })
        .then(function(foundReviews){
            res.send(foundReviews);
        })
});

router.post('/', Auth.assertAuthenticated, function (req, res, next) {
        var myProduct;
        Product.create(req.body)
            .then(function(createdProduct){
        		myProduct = createdProduct;
        		return Location.findById(req.body.location.id);
        	})
        	.then(function(foundLocation){
        		return myProduct.setLocation(foundLocation);
        	})
            .tap(function(createdProduct){
                return myProduct.setUser(req.user);
            })
            .then(function (createdProduct) {
                res.status(201).send(createdProduct);
            })
            .catch(next);
});

router.use('/:id/reviews', require('./reviews'));

router.get('/:id/addToCart', function(req, res, next){	//why is this a get request?  -FLOB
	req.cart.changeProductQuantity(req.productInstance, 1)
	.then(function(updatedCart){
		res.send(updatedCart);
	})
	.catch(next);
});

router.get('/:id/removeFromCart', function(req, res, next){	//shouldn't be a get. -FLOB
	req.cart.changeProductQuantity(req.productInstance, -1)		//why is a cart route here? - FLOB
	.then(function(updatedCart){
		res.send(updatedCart);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
    Product.findOne({
       where: { id: req.params.id },
       include: [ { model: User }, { model: Location }, { model: Review } ]
    })
    .then(function (foundProduct) {
        if (!foundProduct) res.sendStatus(404);
        else res.send(foundProduct);
    })
    .catch(next);
});

router.put('/:id', function (req, res, next) {
    req.productInstance.update(req.body)
        .then(function (updatedProduct) {
            res.send(updatedProduct);
        })
        .catch(next);
});

router.delete('/:id', function (req, res, next) {
    req.productInstance.destroy()
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});
