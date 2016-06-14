/*jshint node: true*/

'use strict';

var db = require('../../db');
var Order = db.model('order');
var Product = db.model('product');
var router = require('express').Router();

module.exports = router;

router.get('/checkout', function(req, res, next){
	req.cart.checkout()
	.then(function(checkOutCompletedCart){
		req.session.cart = null;
		//console.log('sending CHECKOUT');
		res.send(checkOutCompletedCart);
	}).catch(next);
});

router.param('id', function(req, res, next, theId){
    Order.findById(theId)
    .then(function(foundOrder){
        if(!foundOrder) return res.sendStatus(404);
        else req.orderInstance = foundOrder;
        next();
    })
    .catch(next);
});

router.param('productId', function(req, res, next, theId){
    Product.findById(theId)
    .then(function(foundProduct){
        if(!foundProduct) return res.sendStatus(404);
        else req.productInstance = foundProduct;
        next();
    })
    .catch(next);
});

router.get('/', function(req, res, next){
    Order.findAll({})
    .then(function(orders){
        res.send(orders);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next){
    res.send(req.orderInstance);
});

router.post('/', function(req, res, next){
	Order.create(req.body)
	.then(function(createdOrder){
		if(res.user) return createdOrder.setUser(req.userInstance);
		else return createdOrder;
	})
	.then(function(createdOrder){
		res.status(201).send(createdOrder);
	})
	.catch(next);
});

router.put('/:id', function(req, res, next){
	req.orderInstance.update(req.body)
	.then(function(updatedOrder){
		res.send(updatedOrder);
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next){
	req.orderInstance.destroy()
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});

router.delete('/:id/products/:productId', function(req, res, next){
	req.orderInstance.removeProduct(req.productInstance)
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
