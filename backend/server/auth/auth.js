const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config/config");
//
const path = require('path');
const async = require('async');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
var mongoose = require("mongoose");
const hbs = require('nodemailer-express-handlebars');
const email = process.env.MAILER_EMAIL_ID || config.user;
const pass = process.env.MAILER_PASSWORD || config.pass;
const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');
var Templation = require('nodemailer-templation');
var User = require("../models/Professional");
//

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'oauth2',
        user: "email@xyz.com",
        clientId: 'needed',
        clientSecret: 'needed',
        refreshToken: 'needed'
    },
    tls: {
        rejectUnauthorized: false
    }


});


var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./server/templates/'),
    extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));
// verify connection configuration
smtpTransport.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});
//
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({ message: "Authentication failed" });
        }
        var token = req.headers.authorization.split(' ')[1];
        var payload = null;
        try {
            payload = jwt.decode(token, config.TOKEN_SECRET);
        } catch (err) {
            return res.status(401).send({ message: err.message });
        }
        if (payload.exp <= moment.unix()) {
            return res.status(401).send({ message: "Token has expired" });
        }
        req.user = payload.sub;
        next();
    },
    createJWT: function (user) {
        var payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.TOKEN_SECRET);
    },
    decodeJWT: function (req) {
        var token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.decode(token, config.TOKEN_SECRET);
        // console.log(decoded);
        return decoded;
    },
    forgot_password: function (req, res) {
        async.waterfall([
            function (done) {
                User.findOne({
                    email: req.body.email
                }).exec(function (err, user) {
                    if (user) {
                        done(err, user);
                    } else {
                        done('User not found.');
                    }
                });
            },
            function (user, done) {
                // create the random token
                crypto.randomBytes(20, function (err, buffer) {
                    var token = buffer.toString('hex');
                    done(err, user, token);
                });
            },
            function (user, token, done) {
                User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function (err, new_user) {
                    done(err, token, new_user);
                });
            },
            function (token, user, done) {
                var data = {
                    from: email,
                    to: user.email,
                    subject: 'Message',
                    text: 'I hope this message gets through!',
                    template: 'forgot-password-email',
                    subject: 'Password help has arrived!',
                    context: {

                        url: 'http://localhost:4200/#/resetpass/' + token,
                        name: user.name.split(' ')[0]
                    }
                };
                smtpTransport.sendMail(data, function (err) {
                    if (!err) {
                        return res.json({ message: 'Kindly check your email for further instructions' });
                    } else {

                        return done(err);
                    }
                });

            }
        ], function (err) {
            return res.status(422).json({ message: err });
        });
    },
    reset_password: function (req, res, next) {
        User.findOne({
            reset_password_token: req.body.token,
            reset_password_expires: {
                $gt: Date.now()
            }
        }).exec(function (err, user) {
            if (!err && user) {
                if (req.body.password === req.body.confirmPass) {
                    user.changePassword(req.body.password, (err, hashpass) => {
                        if (err) {
                            return res.send({ success: false, message: 'Not Updated' });
                        }
                        else {
                            User.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(user._id) }, { 'password': hashpass }, function (err1, doc1) {
                                if (err1)
                                    res.send({ success: false, message: err1.message });
                                else
                                    res.send({ success: true, message: 'Operation Successful.' });
                            })

                        }
                    });
                    user.reset_password_token = undefined;
                    user.reset_password_expires = undefined;
                    user.save(function (err) {
                        if (err) {
                            return res.status(422).send({
                                message: err
                            });
                        } else {
                            var data = {
                                to: user.email,
                                from: email,
                                template: 'reset-password-email',
                                subject: 'Password Reset Confirmation',
                                context: {
                                    name: user.name.split(' ')[0]
                                }
                            };

                            smtpTransport.sendMail(data, function (err) {
                                if (!err) {
                                    return res.json({ message: 'Password reset' });
                                } else {
                                    return done(err);
                                }
                            });
                        }
                    });
                } else {
                    return res.status(422).send({
                        message: 'Passwords do not match'
                    });
                }
            } else {
                return res.status(400).send({
                    message: 'Password reset token is invalid or has expired.'
                });
            }
        });
    }




}