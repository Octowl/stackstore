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
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        address: {
            type: Sequelize.TEXT,
            defaultValue: 'Please enter an address'
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: 'http://c.directlyrics.com/img/upload/taylor-swift-apple-music.jpg'
            // validate: {
            //     isUrl: true
            // }
        },
        salt: {
            type: Sequelize.STRING,
            set: function(data){
                console.log(data)
            }
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
                return _.omit(this.toJSON(), ['password', 'salt', 'address']);
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
            beforeCreate: function (user) {
                if (user.changed('password')) {
                    user.setDataValue('salt', user.Model.generateSalt());
                    user.setDataValue('password', user.Model.encryptPassword(user.password, user.salt));

                }
            },
            beforeUpdate: function (user) {
                if (user.changed('password')) {
                    user.setDataValue('salt', user.Model.generateSalt());
                    user.setDataValue('password', user.Model.encryptPassword(user.password, user.salt));

                }
            }
        }
    });



};
