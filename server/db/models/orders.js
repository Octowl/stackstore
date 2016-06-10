'use strict';

var Sequelize = require('sequelize');


module.exports = function(db) {

	var OrderItem = db.model('orderItem'); 

    db.define('orders', {
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue : true
        }
    },{
    	instanceMethods:{
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
    			.then(function(items){
    				return self.update({
    					active: false
    				})
    			})
    		}
    	}
    });
};

