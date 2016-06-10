/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

var productPlaceholderImage = 'http://localhost:1337/Images/product_placeholder.jpg';

module.exports = function(db) {
    db.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,  //in cents
            allowNull: false,
            validate: {
                min: 0
            }
        },
        inventory: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        photoUrl: {
            type: Sequelize.STRING,
            defaultValue: productPlaceholderImage,
            validate: {
                isUrl: true
            }
        }
        /*,
        TODO: tags?
        */
    });
};
