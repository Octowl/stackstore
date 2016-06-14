'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model('user');
var Review = db.model('review');
var Product = db.model('product');
var Order = db.model('order');
var OrderItem = db.model('orderItem');
var UserRating = db.model('userRating');

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

router.get('/', function (req, res, next) {
    User.findAll({})
    .then(function(users){
        if (!users.length) return res.sendStatus(404);
        res.send(users)
    })
})

router.get('/user/:id', function (req, res, next) {
    User.findOne({
        where: { id: req.params.id },
        include: [ { model: UserRating } ]
    })
    .then(function(user){
        if (!user) return res.sendStatus(404);
        res.send(user)
    })
})


router.get('/:id', function (req, res, next) {
    res.send(req.foundUser);
})

router.get('/:id/reviews', function (req, res, next) {
    Review.findAll({
            where: {
                userId: req.foundUser.id
            },
            include: [{
                model: Product
            }]
        })
        .then(function (foundReviews) {
            res.send(foundReviews);
        }).catch(next);
});

router.get('/:id/orders', function (req, res, next) {
    Order.findAll({
            where: {
                userId: req.foundUser.id
            },
            include: [{
                model: Product
            },{
                model: OrderItem
            }]
        })
        .then(function (foundOrders) {
            res.send(foundOrders);
        }).catch(next);
});

router.put('/:id', function (req, res, next) {
    req.foundUser.update(req.body)
        .then(function (updatedUser) {
            res.send(updatedUser);
        })
        .catch(next);
});

router.delete('/:id', function (req, res, next) {
    req.foundUser.destroy();
    res.sendStatus(204);
});
