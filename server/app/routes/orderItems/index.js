'use strict';

//This whole thing might go away...
var db = require('../../../db');
var OrderItem = db.model('orderitem');
var Order = db.model('orders');
var Product = db.model('product'); 

var router = require('express').Router();

module.exports = router;

//NOTE THE PRICE IS NOT SET HERE PURPOSEFULLY!
//It is not set here because a price only becomes fixed when the order is placed.
router.post('/:productId', function (req, res, next) {
	var id = req.params.productId;
	 
	req.cart.addProduct(req.body)
	.then(function(createdOrderItem){
		res.send(createdOrderItem); 
	})
  .catch(next);
});



