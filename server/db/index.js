/* jshint node:true */
'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/product')(db);
require('./models/reviews')(db);
require('./models/location')(db);
require('./models/orders')(db);

var Product = db.model('product');
var Location = db.model('location');

Product.belongsTo(Location);
