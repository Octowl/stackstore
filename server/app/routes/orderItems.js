'use strict';

var db = require('../../db');
var OrderItem = db.model('orderItem');
var router = require('express').Router();

module.exports = router;

router.param('id', function (req, res, next, id) {
    OrderItem.findById(Number(id))
        .then(function (foundItem) {
            if (!foundItem) return res.sendStatus(404);
            else req.foundItem = foundItem;
            next();
        })
        .catch(next);
});

router.put('/:id', function(req, res, next){
    req.foundItem.update(req.body)
    .then(function(updatedItem){
        res.status(201).send(updatedItem)
    }).catch(next);
})

router.delete('/:id', function(req,res,next){
	console.log('i was called');
	req.foundItem.destroy()
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
})
