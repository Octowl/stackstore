/* jshint node:true*/

'use strict';


var db = require('../../../db');
var Product = db.model('product');
var Reviews = db.model('reviews');
var router = require('express').Router();

module.exports = router;

router.param('id', function (req, res, next, theId) {
    Product.findById(theId)
        .then(function (foundProduct) {
            if (!foundProduct) res.sendStatus(404);
            else req.productInstance = foundProduct;
            next();
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    Product.findAll({})
        .then(function (products) {
            res.send(products);
        })
        .catch(next);
});

router.post('/', function (req, res, next) {
    Product.create(req.body)
        .then(function (createdProduct) {
            res.status(201).send(createdProduct);
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    res.send(req.productInstance);
});

// router.post('/:id/review', function (req, res, next) {
//     Reviews.create(req.body)
//     .then(function(createdReview){
//         return req.productInstance.addReviews(createdReview)
//     })
//     .then(function(product){
//         console.log(product)
//         res.sendStatus(201)
//     })
// });

router.put('/:id', function (req, res, next) {
    req.productInstance.update(req.body)
        .then(function (updatedProduct) {
            res.send(updatedProduct);
        })
        .catch(next);
});

router.delete('/:id', function (req, res, next) {
    req.productInstance.destroy()
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});
