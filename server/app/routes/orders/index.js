/*jshint node: true*/

'use strict';

var db = require('../../../db');
var Orders = db.model('orders');
var Product = db.model('product');
var OrderItem = db.model('orderItem');
var router = require('express').Router();

module.exports = router;

router.get('/checkout', function(req, res, next){
	req.cart.checkout()
	.then(function(checkOutCompletedCart){
		req.session.cart = null;
		console.log('ORDER COMPLETE:');
		console.log('DETAILS', checkOutCompletedCart); 
		res.send("Congrats on your order: " + checkOutCompletedCart);
	}).catch(next);
});

router.param('id', function(req, res, next, theId){
    Orders.findById(theId)
    .then(function(foundOrder){
        if(!foundOrder) res.sendStatus(404);
        else req.orderInstance = foundOrder;
        next();
    })
    .catch(next);
});

router.get('/', function(req, res, next){
    Orders.findAll({})
    .then(function(orders){
        res.send(orders);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next){
    res.send(req.orderInstance);
});

//Is this how orders are going to actually get created?
router.post('/', function(req, res, next){
	Orders.create(req.body)
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
