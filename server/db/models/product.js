/*jshint node: true*/
'use strict';

var Sequelize = require('sequelize');

var productPlaceholderImage = 'http://localhost:1337/Images/product_placeholder.jpg';

module.exports = function(db) {
    db.define('product', {
        name: {
            type: Sequelize.STRING, //not blank -FLOB
            allowNull: false    //add a unique validator -FLOB
        },
        description: {
            type: Sequelize.STRING, //make into text - FLOB
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,  //in cents -FLOB
            allowNull: false
        },
        inventory: {
            type: Sequelize.INTEGER, //put a minimum -FLOB
            allowNull: false,
            defaultValue: 0
        },
        photoUrl: {
            type: Sequelize.STRING,
            get: function() {   //maybe use a default? -FLOB
                if(!this.getDataValue('photoUrl')) return productPlaceholderImage;
                return this.getDataValue('photoUrl');
            }
        }
        /*,
        tags?   -- DEAD CODE!???  -FLOB
        */
    });
};
