/* jshint node:true*/
'use strict';

var db = require('../../../db');
var Reviews = db.model('reviews');
var Product = db.model('product');
var router = require('express').Router();

module.exports = router;

router.param('id', function (req, res, next, theId) {
    Reviews.findById(theId)
        .then(function (foundReview) {
            if (!foundReview) res.sendStatus(404);
            else req.reviewInstance = foundReview;
            next();
        })
        .catch(next);
});

router.param('productId', function (req, res, next, theId) {
    Product.findById(theId)
        .then(function (foundProduct) {
            if (!foundProduct) res.sendStatus(404);
            else req.productInstance = foundProduct;
            next();
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    Reviews.findAll({})
        .then(function (reviews) {
            res.send(reviews);
        })
        .catch(next);
});

router.post('/:productId', function (req, res, next) {
    var theReview;
    Reviews.create(req.body)
        .then(function (createdReview) {
            theReview = createdReview;
            return req.productInstance.addReviews(createdReview);
        })
        .then(function () {
            res.status(201).send(theReview);
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    res.send(req.reviewInstance);
});

router.put('/:id', function (req, res, next) {
    req.reviewInstance.update(req.body)
        .then(function (updatedReview) {
            res.send(updatedReview);
        })
        .catch(next);
});

router.delete('/:id', function (req, res, next) {
    req.reviewInstance.destroy()
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});
