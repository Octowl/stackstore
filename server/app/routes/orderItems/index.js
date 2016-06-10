'use strict';

//This whole thing might go away...
var db = require('../../../db');
var OrderItem = db.model('orderitem'); //is this working?  its camelcase in the model -FLOB
var Order = db.model('order');
var Product = db.model('product');

var router = require('express').Router();

module.exports = router;

router.param('id', function(req, res, next, id){
	OrderItem.findById(id)
	.then(function(orderItem){
		if(!orderItem) res.sendStatus(404);
		else {
			req.orderItem = orderItem;
			next();
		}
	})
	.catch(next);
})

router.get('/:id', function(req, res, next){
	res.send(req.orderItem);
})

router.put('/:id', function(req, res, next){
	req.orderItem.update(req.body); //not complete - FLOB
})
