/*jshint node: true*/

'use strict';


var db = require('../../../db');
var Orders = db.model('orders');
var User = db.model('user');
var router = require('express').Router();

module.exports = router;


router.param('id', function(req, res, next, theId){
    Orders.findById(theId)
    .then(function(foundOrder){
        if(!foundOrder) res.sendStatus(404);
        else req.orderInstance = foundOrder;
        next();
    })
    .catch(next);
});

router.param('uId', function(req, res, next, theId){
    User.findById(theId)
    .then(function(foundUser){
        if(!foundUser) res.sendStatus(404);
        else req.userInstance = foundUser;
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

router.post('/:uId', function(req, res, next){
	Orders.create(req.body)
	.then(function(createdOrder){
		return createdOrder.setUser(req.userInstance);
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
