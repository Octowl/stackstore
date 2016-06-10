'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    //validate that there are no negative price or quant - FLOB
    db.define('orderItem', {
        price: {
            type: Sequelize.FLOAT //look at price in cents, so use integers -FLOB
        },
        quantity: {
        	type: Sequelize.INTEGER,
        	allowNull: false,
        	defaultValue: 1
        }
    });
};
