/* jshint node:true */
'use strict';
var db = require('./_db');
module.exports = db;

require('./models/product')(db);
require('./models/orderItem')(db);
require('./models/review')(db);
require('./models/user')(db);
require('./models/location')(db);
require('./models/order')(db);

var OrderItem = db.model('orderItem');
var Product = db.model('product');
var User = db.model('user');
var Order = db.model('order');
var Location = db.model('location');
var Review = db.model('review');

Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem});
Order.hasMany(OrderItem);

Product.belongsToMany(Order, {through: OrderItem});
Product.belongsTo(Location);
Product.hasMany(Review);

Review.belongsTo(Product);
Review.belongsTo(User);

Product.belongsTo(User);

User.hasMany(Order);
User.hasMany(Review);
User.hasMany(Product);
