'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model('user');
module.exports = router;

router.param('id', function (req, res, next, id) {
    User.findById(id)
        .then(function (user) {
            if (!user) return res.sendStatus(404);
            req.foundUser = user;
            next();
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    res.send(req.foundUser);
})

router.put('/:id', function (req, res, next) {
	console.log(req.body);
    req.foundUser.update(req.body)
        .then(function(updatedUser){
			res.send(updatedUser);
		})
        .catch(next);
});

router.delete('/:id', function (req, res, next) {
    req.foundUser.destroy();
    res.sendStatus(204);
});
