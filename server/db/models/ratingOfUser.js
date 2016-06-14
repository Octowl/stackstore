/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('userRating', {
        stars: {
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: false
        }
    });
};