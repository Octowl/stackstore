/*jshint node:true*/
'use strict';

var Sequelize = require('sequelize');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function(db) {
    var OrderItem = db.model('orderItem');
    db.define('order', {
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue : true	//probably need more than true and false, maybe created, cancelled, complete -FLOB
        }
    },{
        defaultScope: {
            include: [OrderItem]
        },
        instanceMethods: {
            hasProduct: function(product) {
                return this.getProducts()
                .then(function(products){
                    return _.any(products, product);
                });
            },
            changeProductQuantity: function(product, num) {
                var self = this;
                return self.hasProduct(product)
                .then(function(hasProduct){
                    if(hasProduct){
                        return OrderItem.findOne({
            				where : {
            					orderId : self.id,
            					productId : product.id
            				}
            			})
            			.then(function(foundItem) {
            				return foundItem.changeQuantity(num);
            			})
            			.then(function(){
            				return self;
            			});
            		} else {
            			return self.addProduct(product);
            		}
                });
            },
            checkout: function() {
    			var self = this;

    			return OrderItem.findAll({
    					where: {
    						orderId: this.id
    					}
    				})
    			.then(function(items){
    				return Promise.all(items.map(function(item){
    					return item.lockPrice();
    				}));
    			})
    			.then(function(){
    				return self.update({
    					active: false
    				});
    			});
    		}
        }
    });
};
