'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model('user');
module.exports = router;

router.get('/:id', function(req, res, next){
	var id = Number(req.params.id);
	// console.log("USER MODEL", User);
	// 	console.log("THIS IS THE ID", id);
	User.findById(id)
	.then(function(user){
		//console.log(user);
		res.send(user);
	})
	.catch(next);
})