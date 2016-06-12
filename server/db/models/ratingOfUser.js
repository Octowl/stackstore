/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('ratingOfUser', {
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