/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

var productPlaceholderImage = 'http://localhost:1337/Images/product_placeholder.jpg'

module.exports = function(db) {
    db.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        coordinates: {
            type: Sequelize.GEOMETRY('POINT'),
            allowNull: false
        }
    });
};
