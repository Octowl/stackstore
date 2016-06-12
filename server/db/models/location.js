/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('location', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
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
