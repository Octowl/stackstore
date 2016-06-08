'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model('user');
module.exports = router;

router.param('id', function(req, res, next, id){
	User.findById(id)
	.then(function(user){
		req.user = user;
		next(); 
	})
	.catch(next);
})

router.get('/:id', function(req, res, next){
	if(req.user) res.send(req.user);
	else res.sendStatus(404);
})