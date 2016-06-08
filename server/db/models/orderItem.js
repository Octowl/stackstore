'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('orderItem', {
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0.00
        }
    });
};
