/* jshint node:true*/
'use strict';

var db = require('../../db');
var Review = db.model('review');
var router = require('express').Router();

module.exports = router;

router.param('id', function (req, res, next, theId) {
    Review.findById(theId)
        .then(function (foundReview) {
            if (!foundReview) res.sendStatus(404);
            else req.reviewInstance = foundReview;
            next();
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    Review.findAll({})
        .then(function (reviews) {
            res.send(reviews);
        })
        .catch(next);
});

router.post('/', function (req, res, next) {
    Review.create(req.body)
        .then(function (createdReview) {
            res.status(201).send(createdReview);
        })
        .catch(next);
});

// Tap was breaking this for me
// router.post('/', function (req, res, next) {
//     Review.create(req.body)
//         .tap(function (createdReview) {
//             return req.productInstance.addReview(createdReview);
//         })
//         .then(function (createdReview) {
//             res.status(201).send(createdReview);
//         })
//         .catch(next);
// });

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
