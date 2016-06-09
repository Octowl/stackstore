/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

var productPlaceholderImage = 'http://localhost:1337/Images/product_placeholder.jpg'

module.exports = function(db) {
    db.define('location', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        latitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });
};
