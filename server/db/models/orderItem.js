'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('orderItem', {
        price: {
            type: Sequelize.FLOAT
        },
        quantity: {
        	type: Sequelize.INTEGER,
        	allowNull: false,
        	defaultValue: 1
        }
    });
};
