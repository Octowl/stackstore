'use strict';

var Sequelize = require('sequelize');

//maybe singularize the model name? -FLOB
module.exports = function(db) {
    db.define('orders', {
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue : true	//probably need more than true and false, maybe created, cancelled, complete -FLOB
        }
    });
};

