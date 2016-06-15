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
            userId: 1, 
            locationId : 234,
            photoUrl: 'http://www.cigarettesstoreonline.com/images/Marlboro-Lights/Online-Discount-Marlboro-Light-Cigarette-Store-10-Cartons.jpg'
    }, 
    {
            name: 'Shagel',
            description: 'Shower Gel',
            price: 5,
            inventory: 100,
            userId: 2, 
            locationId : 1,
            photoUrl: 'http://www.beautyheaven.com.au/sites/default/files/product_images/35032-dove-purely-pampering-body-wash.jpg'
    }, 
    {
            name: 'Perfume 1',
            description: 'Musc',
            price: 40,
            inventory: 10,
            userId: 3, 
            locationId : 146,
            photoUrl: 'http://boisdejasmin.com/images/old/6a00d8341c706153ef014e5f6f5a61970c-pi.jpg'
    },
    {
            name: 'Coffee',
            description: 'Nice coffee',
            price: 20,
            inventory: 10,
            userId: 4,
            locationId : 170,
            photoUrl : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS9J_mzDpnzpQ1URt-v48iGt52DxmVZIDxr7pqzTxGBLF-DQe2Wsw'
    }, 
    {
            name: 'Olive oil',
            description: 'Very nice for cooking. Light olive oil. ',
            price: 8,
            inventory: 20,
            userId: 3,
            locationId: 202,
            photoUrl : 'http://www.medicalnewstoday.com/content/images/articles/266/266258/olive-oil-and-olives.jpg'
    }, 
    {
            name: 'Cheese',
            description: 'This cheese is the best.',
            price: 10,
            inventory: 20,
            userId: 5,
            locationId : 154,
            photoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcTC5PSc_qjiiJiw0gtoOQtxE2m2KwsFixTnql07M5lbjN3ldxA'
    },
    {
            name: 'Sheets set',
            description: 'Smooth and sweet.',
            price: 60,
            inventory: 5,
            userId: 6,
            locationId : 72,
            photoUrl : 'http://ak1.ostkcdn.com/images/products/6834344/Hemstitch-Embroidery-Egyptian-Cotton-800-Thread-Count-Sheet-Set-or-Pillowcase-Separates-P14362697.jpg'
    },
    {
            name: 'Orphan puppy',
            description: 'He is so cute, just adopt him',
            price: 1500,
            inventory: 1,
            userId: 1,
            locationId : 66,
            photoUrl : 'http://a.abcnews.com/images/Lifestyle/ABC_cat_dog_01_as_160425_4x3_992.jpg'
    },
    {
            name: 'Horses',
            description: 'The most majestic horse that has ever lived.',
            price: 1024500,
            inventory: 1,
            userId: 4, 
            locationId : 110,
            photoUrl: 'http://triggerpit.com/wp-content/uploads/2011/11/arabian-horses.jpg'
    },
    {
            name: 'Fluffy Cow',
            description: 'The most misunderstood family pet.',
            price: 40000,
            inventory: 19,
            userId: 2, 
            locationId : 110,
            photoUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/enhanced/webdr05/2013/6/10/9/enhanced-buzz-19386-1370872534-24.jpg'
    },
    {
            name: 'Fluffy Chicken',
            description: 'Great family pet. They are also fun to look at!',
            price: 37589,
            inventory: 9900,
            userId: 4, 
            locationId : 110,
            photoUrl: 'https://s-media-cache-ak0.pinimg.com/736x/21/19/c0/2119c01ef1edbffdf9052de5d438d1b6.jpg'
    },
    {
            name: 'Coffee Beans',
            description: 'A good cup of joe is good for the soul',
            price: 37589,
            inventory: 370,
            userId: 1, 
            locationId : 111,
            photoUrl: 'http://pngimg.com/upload/coffee_beans_PNG9276.png'
    },
    {
            name: 'Tiger stuffed animal',
            description: 'Tigers are the coolest! Get a fluffy one!',
            price: 37589,
            inventory: 1000,
            userId: 6, 
            locationId : 104,
            photoUrl: 'http://animalsneedsavingtoo.weebly.com/uploads/4/7/9/6/47962395/s124121091749439290_p1_i1_w500.jpeg'
    },{
            name: 'A cookie.',
            description: 'This cookie has been licked by the King.',
            price: 10000,
            inventory: 1,
            userId: 6, 
            locationId : 188,
            photoUrl: 'http://3.bp.blogspot.com/-P87VGfPnOFo/Tsf86vgg4jI/AAAAAAAAAfM/1qy0e395Rww/s1600/Who+Took+the+Cookie+-+cookie.png'
    }
    ,{
            name: 'My mother-in-law',
            description: 'She makes amazing chicken parm',
            price: 1,
            inventory: 1,
            userId: 4, 
            locationId : 43,
            photoUrl: 'http://az616578.vo.msecnd.net/files/2016/03/04/6359273125106978461464139042_grandma.16.9.jpg'
    },
    {
            name: 'Chobani',
            description: 'Yogurt',
            price: 2,
            inventory: 1,
            userId: 6, 
            locationId : 90,
            photoUrl: 'http://cdn2-www.momtastic.com/assets/uploads/2013/09/Chiobani.jpg'
    },{
            name: 'Matt Landers',
            description: 'Spend one evening with the one and only.',
            price: 25,
            inventory: 1000,
            userId: 4, 
            locationId : 143,
            photoUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAYgAAAAJDg1ZDU2ZmJjLTQyNGYtNDdmNi1iZGU0LWY4YjRkZTlmN2EzYQ.jpg'
    },{
            name: 'Key Chain',
            description: 'Good for keeping keys together',
            price: 2,
            inventory: 2,
            userId: 6, 
            locationId : 149,
            photoUrl: 'http://www.stupid.com/assets/images/plush_zombie_keychain_1.jpg'
    },
    {
            name: 'Shrunken Heads',
            description: 'Great for your living room. I made these myself.',
            price: 70,
            inventory: 50,
            userId: 6,
            locationId: 179,
            photoUrl: 'http://i57.tinypic.com/2ypnqys.jpg'
    },
    {
            name: 'Chinese Lantern',
            description: 'This is definitely from China. Not from China Town.',
            price: 2,
            inventory: 1,
            userId: 6,
            locationId: 228,
            photoUrl: 'http://www.taiwanese-secrets.com/image-files/chinese-lantern-festival.002.jpg'
    },
    {
            name: 'Hipster Dishdasha',
            description: 'For the trendy Arabian in everyone',
            price: 500,
            inventory: 3,
            userId: 5,
            locationId: 226,
            photoUrl: 'https://s-media-cache-ak0.pinimg.com/736x/5b/ae/f9/5baef990dcfadd06f8a5a9ee7c6d7fb4.jpg'
    },
    {
            name: 'Oud',
            description: 'Arabian lute type thingy',
            price: 300,
            inventory: 1,
            userId: 5,
            locationId: 236,
            photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Oud_Azerba%C3%AFdjan.JPG'
    },
    {
            name: 'Fanoos',
            description: 'Ramadan Kareem everyone :)',
            price: 1,
            inventory: 100,
            userId: 5,
            locationId: 72,
            photoUrl: 'http://cf.ltkcdn.net/crafts/images/std/137683-283x424-fanoos.jpg'
    }];

    var creatingProducts = products.map(function (productObj, idx) {
        var product;
        return Product.create(productObj)
        .then(function(_product){
            product = _product;
            return Location.findById(product.locationId);
        })
        .then(function(location){
            return product.setLocation(location);
        });
    });

    return Promise.all(creatingProducts);
};

var seedLocations = function () {
    var locations = newCountries;

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
        isAdmin: true
    }, {
        firstName: 'Barry',
        lastName: 'O',
        email: 'obama@gmail.com',
        password: 'potus',
        address: 'somewhere'
    }, {
        firstName: 'Jenna',
        lastName: 'Zenk',
        email: 'zenkjenna@gmail.com',
        password: 'jenna',
        address: 'White House',
        isAdmin : true,
        image: 'Images/jennaprofilepicture.jpg'
    }, {
        firstName: 'Matt',
        lastName: 'Landers',
        email: 'mattlanders@gmail.com',
        password: 'jennaisreallycool',
        address: 'Los Angeles'
    },{
        firstName: 'Aziz',
        lastName: 'Alsaffar',
        email: 'azizalsaffar@gmail.com',
        password: 'jennaisreallycool',
        address: 'London'
    }, {
        firstName: 'Corey',
        lastName: 'Greenwaldo',
        email: 'thegreenone@gmail.com',
        isAdmin: false,
        password: 'green',
        address: 'Island of Great Length'
    }, {
        firstName: 'FLOB',
        lastName: 'FLOB',
        email: 'flob@fsa.com',
        password: 'coveisreallycool',
        address: '10 Hanover Square, New York'
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
