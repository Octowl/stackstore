'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('user', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING, //should be unique -FLOB
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING, //use text because it can get long -FLOB
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        image: {
            type: Sequelize.STRING, //url validator can be used - FLOB
            defaultValue: 'http://c.directlyrics.com/img/upload/taylor-swift-apple-music.jpg'
        },
        rating: {
            type: Sequelize.FLOAT   //how would it be set properly? -FLOB
        },
        salt: {
            type: Sequelize.STRING
        },
        twitter_id: {
            type: Sequelize.STRING
        },
        facebook_id: {
            type: Sequelize.STRING
        },
        google_id: {
            type: Sequelize.STRING
        }
    }, {
        instanceMethods: {
            sanitize: function () {
                return _.omit(this.toJSON(), ['password', 'salt']);
            },
            correctPassword: function (candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
            }
        },
        classMethods: {
            generateSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function (plainText, salt) {
                var hash = crypto.createHash('sha1');
                hash.update(plainText);
                hash.update(salt);
                return hash.digest('hex');
            }
        },
        hooks: {
            beforeValidate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }
        }
    });



};

