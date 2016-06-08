var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
var db = new Sequelize(env.DATABASE_URI, {
    logging: false
});

module.exports = db;
