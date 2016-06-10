/*jshint node: true*/
'use strict';
//maybe singularize the model name? -FLOB
var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('reviews', {
        stars: {
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: false
        },
        comment: {
            type: Sequelize.TEXT
        }
    });
};