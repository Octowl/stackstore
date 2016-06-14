'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: "302353899902-kt5vodm5avtfrl3qaoighp10553tdef7.apps.googleusercontent.com",
        clientSecret: "zb2Uro-88AS08SGdJ_z3W6qN",
        callbackURL: "/auth/google/callback"
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log(profile._json);
        User.findOne({
                where: {
                    google_id: profile.id
                }
            })
            .then(function (user) {
                console.log(user);
                if (user) {
                    return user;
                } else {
                    console.log('made it to create');
                    return User.create({
                        google_id: profile.id,
                        firstName: profile._json.given_name,
                        lastName: profile._json.family_name,
                        email: profile._json.email,
                        image: profile._json.picture
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
