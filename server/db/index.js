/* jshint node:true */
'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/product')(db);
require('./models/reviews')(db);
require('./models/location')(db);
require('./models/order')(db);
require('./models/orderItem')(db);

var Product = db.model('product');
var User = db.model('user');
var Orders = db.model('order');
var OrderItem = db.model('orderItem');
var Location = db.model('location');
var Reviews = db.model('reviews');

Orders.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Orders, {through: OrderItem});

Product.belongsTo(Location);

Product.hasMany(Reviews);

Product.belongsTo(User);
User.hasMany(Product);
//Reviews belong to users who make them? -FLOB
