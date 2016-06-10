'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {

    var Product = db.model('product');

    db.define('orderItem', {
        price: {
            type: Sequelize.FLOAT
        },
        quantity: {
        	type: Sequelize.INTEGER,
        	allowNull: false,
        	defaultValue: 1
        }
    },{
        instanceMethods: {
            lockPrice: function(){
                var self = this;
                return Product.findById(self.productId)
                .then(function(product){
                    return self.update({
                        price: product.price
                    })

                })
            }
        }
    });
};
