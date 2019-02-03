const bcrypt = require('bcryptjs');
const passport = require('passport');
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');
var crypto = require('crypto');
var async = require('async');

//Bring in User Model
let User = require('../../models/user');

// login process
exports.login=function(req, res, next){
    passport.authenticate('local',{
        successRedirect:'/welcome',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req,res, next);
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('/users/login');
    return;
}

exports.register=function(req, res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const dob = req.body.dob;
    const matriculation = req.body.matriculation;
    const password = req.body.password;
    const confirm = req.body.confirm;
    const userId = randomstring.generate(10);

    req.checkBody('firstname', 'First name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('dob','Date of Birth is required').notEmpty();
    req.checkBody('matriculation','Matriculation Number is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('confirm','Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    
    if(errors){
        if(errors)
        {
            req.flash('error',errors[0].msg);
        }
        //res.redirect('/users/register');
        req.render('/register');
        return;
    } else {
        var newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            dob: dob,
            matriculation:matriculation,
            password: password,
            userId: userId
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password,salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    else{
                        req.flash('success','You are successfully registered!');
                        res.redirect('/users/login');
                        return;
                    }
                });
            });
        });
    }
}

exports.getUserProfile = function(req, res, userId, handleSuccessResponse, handleErrorResponse){
    if(userId)
    {
        User.find({userId : userId}, { password: 0}).lean().exec(function(err, result){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, result)
        })
        return
    }
    handleErrorResponse(req, res, new Error('User id not provided'))
}

exports.sendSecurityToken = function(req, res, next, email, handleSuccessResponse, handleErrorResponse)
{
    console.log(email)
    if(email)
    {
        
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    console.log(token)
                    done(err, token);
                });
            },
            function (token, done) {
                User.findOne({
                    email: email
                }, function (err, user) {
                    if (!user) {
                        handleErrorResponse(req, res,'No account with that email address exists.');
                        return;
                    }
    
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                    console.log(user)
                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                var smtpTransport = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'bikehiresystem@gmail.com',
                        pass: 'bikehire123'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'bikehiresystem@gmail.com',
                    subject: 'TheBookQuest Password Reset',
                    text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function (err) {
            if (err) return next(err);
            handleSuccessResponse(req, res);
        });
        return;
    }
    handleErrorResponse(req, res)
}

exports.verifySecurityToken = function(req, res, token, handleSuccessResponse, handleErrorResponse){
    if(token)
    {
        User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, function (err, user) {
            if (!user) {
                handleErrorResponse(req, res, 'Password reset token is invalid or has expired.');
                return;
            }
            handleSuccessResponse(req, res);
        });
        return;
    }
    handleErrorResponse(req, res)
}

exports.resetPassword = function(req, res, token, password, handleSuccessResponse, handleErrorResponse){
    async.waterfall([
        function (done) {
            User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function (err, user) {
                if (!user) {
                    handleErrorResponse(req, res, 'Password reset token is invalid or has expired.');
                    return;
                }
                req.checkBody('password', 'Password is required').notEmpty();
                req.checkBody('confirm', 'Passwords do not match').equals(password);

                let errors = req.validationErrors();

                if (errors) {
                    handleErrorResponse(req, res, errors[0].msg);
                    return;
                } else {
                    user.password = password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.password, salt, function (err, hash) {
                            if (err) {
                                console.log(err);
                            }
                            user.password = hash;
                            user.save(function (err) {
                                done(err, user);
                            });
                        });
                    });
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'bikehiresystem@gmail.com',
                    pass: 'bikehire123'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'bikehiresystem@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        handleSuccessResponse(req, res);
    });
}
//module.exports = {register: require('.')}