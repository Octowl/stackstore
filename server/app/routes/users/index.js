'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
module.exports = router;

router.param('id', function(req, res, next, id){
	User.findById(id)
	.then(function(user){
		req.foundUser = user;
		next(); 
	})
	.catch(next);
}) // put the 404 error handling here -FLOB

router.get('/:id', function(req, res, next){
	if(req.foundUser) res.send(req.foundUser);
	else res.sendStatus(404);
})

router.put('/:id', function(req, res, next){
	if(req.foundUser) {
		req.foundUser.update(req.body)
		.then(function(updatedUser){
			res.send(updatedUser)
		})
		.catch(next);
	}
	else res.sendStatus(400);
})

router.delete('/:id', function(req, res, next){
	if(req.foundUser) {
		if(req.foundUser) //double if... really? come on -FLOB
		req.foundUser.destroy();
		res.sendStatus(204);
	}
	else res.sendStatus(404);
})