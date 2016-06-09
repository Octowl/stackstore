/* jshint node:true */
'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/product')(db);
require('./models/reviews')(db);
require('./models/location')(db);
require('./models/orders')(db);
require('./models/orderItem')(db);

var Product = db.model('product');
var User = db.model('user');
var Orders = db.model('orders');
var OrderItem = db.model('orderItem');
var Location = db.model('location');
var Reviews = db.model('reviews');

Orders.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Orders, {through: OrderItem});

Product.belongsTo(Location);
Product.hasMany(Reviews);

Orders.belongsTo(User);
User.hasMany(Orders);