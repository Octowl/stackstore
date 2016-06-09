/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

var productPlaceholderImage = 'http://localhost:1337/Images/product_placeholder.jpg';

module.exports = function(db) {
    db.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        inventory: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        photoUrl: {
            type: Sequelize.STRING,
            get: function() {
                if(!this.getDataValue('photoUrl')) return productPlaceholderImage;
                return this.getDataValue('photoUrl');
            }
        }
        /*,
        tags?
        */
    });
};
