/* jshint node:true*/

'use strict';


var db = require('../../../db');
var Product = db.model('product');
var router = require('express').Router();

module.exports = router;

router.get('/', function(req, res, next){
    Product.findAll()
    .then(function(products){
        res.send(products);
    })
    .catch(next);
});
