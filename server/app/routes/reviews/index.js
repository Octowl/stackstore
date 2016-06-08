/* jshint node:true*/

'use strict';


var db = require('../../../db');
var Reviews = db.model('reviews');
var router = require('express').Router();

module.exports = router;

router.param('id', function(req, res, next, theId){
	Reviews.findById(theId)
	.then(function(foundReview){
		if(!foundReview) res.sendStatus(404);
		else req.reviewInstance = foundReview;
		next();
	})
	.catch(next);
})

router.get('/', function(req, res, next){
    Reviews.findAll({})
    .then(function(reviews){
        res.send(reviews);
    })
    .catch(next);
});

router.post('/', function(req, res, next){
	Reviews.create(req.body)
	.then(function(createdReview){
		res.status(201).send(createdReview);
	})
	.catch(next);
})

router.get('/:id', function(req, res, next){
	res.send(req.reviewInstance);
})

router.put('/:id', function(req, res, next){
	req.reviewInstance.update(req.body)
	.then(function(updatedReview){
		res.send(updatedReview);
	})
	.catch(next);
})

router.delete('/:id', function(req, res, next){
	req.reviewInstance.destroy()
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
})
