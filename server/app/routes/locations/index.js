/* jshint node:true*/
'use strict';

var db = require('../../../db');
var Location = db.model('location');
var router = require('express').Router();

module.exports = router;

router.param('id', function (req, res, next, theId) {
    Location.findById(theId)
        .then(function (foundLocation) {
            if (!foundLocation) return res.sendStatus(404);
            else req.productInstance = foundLocation;
            next();
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    Location.findAll({})
        .then(function (products) {
            res.send(products);
        })
        .catch(next);
});

router.post('/', function (req, res, next) {
    Location.create(req.body)
        .then(function (createdLocation) {
            res.status(201).send(createdLocation);
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    res.send(req.productInstance);
});

router.put('/:id', function (req, res, next) {
    req.productInstance.update(req.body)
        .then(function (updatedLocation) {
            res.send(updatedLocation);
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
