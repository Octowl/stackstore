/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Location = db.model('location');
var Promise = require('sequelize').Promise;

var seedProducts = function () {

    var products = [{
        name: 'Marlboro Light',
        description: 'cigarets',
        price: 40,
        inventory: 10
    }, {
        name: 'Shagel',
        description: 'Shower Gel',
        price: 5,
        inventory: 100
    }, {
        name: 'Perfume 1',
        description: 'Musc',
        price: 40,
        inventory: 10
    }];

    var creatingProducts = products.map(function (productObj) {
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);
};

var seedLocations = function () {
    var locations = [{
        name: "Paris",
        latitude: 48.8566,
        longitude: 2.3522
    }, {
        name: "London",
        latitude: 51.5074,
        longitude: 0.1278
    }, {
        name: "New York",
        latitude: 40.7128,
        longitude: 74.0059
    }];

    var creatingLocations = locations.map(function (locationObj) {
        return Location.create(locationObj);
    });

    return Promise.all(creatingLocations);
};

var seedUsers = function () {

    var users = [{
        firstName: 'Foshizzle',
        lastName: 'MaNizzle',
        email: 'shizzle@fsa.com',
        password: 'foshiz',
        address: '17 Park Pl. Westbury, NY, 11213'
    }, {
        firstName: 'Barry',
        lastName: 'O',
        email: 'obama@gmail.com',
        password: 'potus',
        address: 'White House'
    }];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

db.sync({
        force: true
    })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedProducts();
    })
    .then(function(){
        return seedLocations();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
