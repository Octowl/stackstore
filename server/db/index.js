'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/product')(db);
require('./models/orders')(db);
require('./models/orderItem')(db);

var Product = db.model('product');
var User = db.model('user');
var Orders = db.model('orders');
var OrderItem = db.model('orderItem');

// OrderItem.hasOne(Product, {foreignKey: 'product_id'})
// OrderItem.hasOne(Orders, {foreignKey: 'order_id'});

//Orders.hasMany(Product 'through' OrderItem);
Orders.belongsToMany(Product, {through: OrderItem}); 
Product.belongsToMany(Orders, {through: OrderItem});
// Orders.hasMany(Product, {through: })