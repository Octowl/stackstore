/*jshint node:true*/

'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('orderItem', {
        price: {
            type: Sequelize.INTEGER, //Price is in cents!
            validate: {
                min: 0
            }
        },
        quantity: {
        	type: Sequelize.INTEGER,
        	allowNull: false,
        	defaultValue: 1,
            validate: {
                min: 0
            }
        }
    },{
        instanceMethods: {
            changeQuantity: function(num) {
                return this.update({
                    quantity: this.quantity + num
                });
            }
        }
    });
};
