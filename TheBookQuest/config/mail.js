const smtpConfig = require('./smtp');
const nodemailer = require('nodemailer');

exports.sendTokenEmail = function(req, res, token, user, done){
    var smtpTransport = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        auth: {
            user: smtpConfig.auth.user,
            pass: smtpConfig.auth.pass
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

exports.resetPasswordConfirmation = function(req, res, user, done){
    var smtpTransport = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        auth: {
            user: smtpConfig.auth.user,
            pass: smtpConfig.auth.pass
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