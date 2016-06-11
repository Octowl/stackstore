/* jshint node:true */
'use strict';
var db = require('./_db');
module.exports = db;

require('./models/orderItem')(db);
require('./models/review')(db);
require('./models/user')(db);
require('./models/product')(db);
require('./models/location')(db);
require('./models/order')(db);

var OrderItem = db.model('orderItem');
var Product = db.model('product');
var User = db.model('user');
var Order = db.model('order');
var Location = db.model('location');
var Review = db.model('review');

Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

Product.belongsTo(Location);

Product.hasMany(Review);

Product.belongsTo(User);
User.hasMany(Product);
//Reviews belong to users who make them? -FLOB
