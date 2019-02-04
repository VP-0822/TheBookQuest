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
        from: 'thebookquest19@gmail.com',
        subject: 'TheBookQuest Password Reset',
        html: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
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
        from: 'thebookquest19@gmail.com',
        subject: 'Your password has been changed',
        html: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
    });
}

exports.sendIssuedLitConfirmation = function (req, res, userId, literatureId,issueId){
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
        to:req.user.email,
        from: 'thebookquest19@gmail.com',
        subject: 'Your literature has been issued',
        html: 'Hello,\n\n' +
            'This is a confirmation that the literature id <b>' + literatureId + '</b> has just been issued. Issue id is <b>'+ issueId +'</b> \n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
    });

    
}

exports.sendRequestLitConfirmation = function (req, res, userId, literatureTitle){
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
        to:req.user.email,
        from: 'thebookquest19@gmail.com',
        subject: 'Literature Requested',
        html: 'Hello,\n\n' +
            'This is a confirmation that the literature ' + literatureTitle + ' has just been requested.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
    });

    
}

exports.sendReturnLitConfirmation = function (req, res, userId,literatureId,issueId){
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
        to:req.user.email,
        from: 'thebookquest19@gmail.com',
        subject: 'Literature Returned',
        html: 'Hello,\n\n' +
            'This is a confirmation that the literature ' + issueId + ' has just been returned.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
    });

    
}