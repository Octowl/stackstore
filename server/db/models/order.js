'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {
    db.define('order', {
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue : true	//probably need more than true and false, maybe created, cancelled, complete -FLOB
        }
    });
};
