'use strict';

var Sequelize = require('sequelize');


module.exports = function(db) {
    db.define('orders', {
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue : true
        }
    });
};

