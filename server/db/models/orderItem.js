/*jshint node:true*/

'use strict';

var Sequelize = require('sequelize');

module.exports = function(db) {

    var Product = db.model('product');

    db.define('orderItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true
        },
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
        defaultScope: {
            include: [Product]
        },
        instanceMethods: {
            changeQuantity: function(num) {
                return this.update({
                    quantity: this.quantity + num
                });
            },
            lockPrice: function(){
                var self = this;
                return Product.findById(self.productId)
                .then(function(product){
                    return Promise.all([
                        product.decreaseQuantity(self.quantity),
                        self.update({ price: product.price})
                ])})
            }
        }
    }
    );
};
