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
var Review = db.model('review');
var Order = db.model('order');
var userRating = db.model('userRating');
var newCountries = require('./countrieslist.js');

var Promise = require('sequelize').Promise;

var seedProducts = function () {

    var products = [{
        name: 'Marlboro Light',
        description: 'cigarets',
        price: 40,
        inventory: 0,
        userId: 1
    }, {
        name: 'Shagel',
        description: 'Shower Gel',
        price: 5,
        inventory: 100,
        userId: 2
    }, {
        name: 'Perfume 1',
        description: 'Musc',
        price: 40,
        inventory: 10,
        userId: 3
    }];

    var creatingProducts = products.map(function (productObj, idx) {
        var product;
        return Product.create(productObj)
        .then(function(_product){
            product = _product;
            return Location.findById(idx+1);
        })
        .then(function(location){
            return product.setLocation(location);
        });
    });

    return Promise.all(creatingProducts);
};

var seedLocations = function () {
    // var countries = newCountries;
    var locations = newCountries;
    // var locations = [{
    //     name: "Egypt",
    //     latitude: 48.8566,
    //     longitude: 2.3522
    // }, {
    //     name: "France",
    //     latitude: 51.5074,
    //     longitude: 0.1278
    // }, {
    //     name: "Dubaï",
    //     latitude: 40.7128,
    //     longitude: 74.0059
    // }, {
    //     name: "Afghanistan",
    //     latitude: 34.2800,
    //     longitude: 69.1100
    // }, {
    //     name: "Bahamas",
    //     latitude: 25.05,
    //     longitude: 77.20
    // }];

    var creatingLocations = locations.map(function (locationObj) {
        return Location.create(locationObj);
    });

    return Promise.all(creatingLocations);
};

var seedOrders = function() {
    var orders = [{
        active: true,
        userId: 1
    },{
        active: false,
        userId: 2
    },{
        active: false,
        userId: 5
    },{
        active: false,
        userId: 3
    },{
        active: false,
        userId: 4
    }];

    var creatingOrders = orders.map(function (orderObj) {
        return Order.create(orderObj);
    });

    return Promise.all(creatingOrders);
};



var seedReviews = function () {
    var reviews = [{
        stars : 5,
        comment : 'Great Product',
        userId : 3,
        productId : 1
    }, {
        stars : 1,
        comment : 'Terrible Product',
        userId : 4,
        productId : 2
    }, {
        stars : 4,
        comment : 'Okay Product',
        userId : 5,
        productId : 3
    },{
        stars : 5,
        comment : 'Really loved it',
        userId : 3,
        productId : 1
    },{
        stars : 1,
        comment : 'Terrible',
        userId : 3,
        productId : 2
    },{
        stars : 3,
        comment : 'AMAZING',
        userId : 5,
        productId : 2
    }, {
        stars : 5,
        comment : 'Who thought of this!??!?',
        userId : 6,
        productId : 2
    }];

    var creatingReviews = reviews.map(function (reviewObj) {
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews);
};

var seedUsers = function () {

    var users = [{
        firstName: 'Foshizzle',
        lastName: 'MaNizzle',
        email: 'corey@fsa.com',
        password: 'foshiz',
        address: '17 Park Pl. Westbury, NY, 11213',
        isAdmin: 'true',
        rating:3
    }, {
        firstName: 'Barry',
        lastName: 'O',
        email: 'obama@gmail.com',
        password: 'potus',
        address: 'somewhere',
        rating:3
    }, {
        firstName: 'Jenna',
        lastName: 'Zenk',
        email: 'zenkjenna@gmail.com',
        password: 'jenna',
        address: 'White House',
        rating:5,
        isAdmin : true,
        image: 'jennaprofilepicture.jpg'
    }, {
        firstName: 'Matt',
        lastName: 'Landers',
        email: 'mattlanders@gmail.com',
        password: 'jennaisreallycool',
        address: 'Los Angeles',
        rating:1
    },{
        firstName: 'Aziz',
        lastName: 'Alsaffar',
        email: 'azizalsaffar@gmail.com',
        password: 'jennaisreallycool',
        address: 'London',
        rating:5
    }, { 
        firstName: 'Corey',
        lastName: 'Greenwaldo',
        email: 'thegreenone@gmail.com',
        isAdmin: true,
        password: 'green',
        address: 'Island of Great Length',
        rating:4
    }];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedUserRatings = function () {
    var userRatings = [{
        stars : 3,
        userId : 1
    },{
        stars : 4,
        userId : 1
    },{
        stars : 5,
        userId : 1
    },{
        stars : 5,
        userId : 2
    },{
        stars : 5,
        userId : 2
    },{
        stars : 4,
        userId : 2
    },{
        stars : 5,
        userId : 3
    },{
        stars : 4,
        userId : 3
    },{
        stars : 5,
        userId : 3
    }];

    var creatingUserRatings = userRatings.map(function (ratingObj) {
        return userRating.create(ratingObj);
    });

    return Promise.all(creatingUserRatings);
};

db.sync({
        force: true
    })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedLocations();
    })
    .then(function () {
        return seedProducts();
    })
    .then(function() {
        return seedReviews();
    })
    .then(function(){
        return seedOrders();
    })
    .then(function() {
        return seedUserRatings();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
