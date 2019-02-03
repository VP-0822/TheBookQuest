const register = require('../controllers/auth/register')
const express = require('express');
const router = express.Router();
const authValidator = require('../controllers/auth/authValidator');

//Register Form
router.get('/register', authValidator.isLoggedOut(), function (req, res) {
    res.render('register', {
        custSuccessMessage: req.flash('success'),
        custErrorMessage: req.flash('error')
    });
});

router.get('/login', authValidator.isLoggedOut(), function (req, res) {
    res.render('login', {
        custSuccessMessage: req.flash('success'),
        custErrorMessage: req.flash('error')
    });
});

router.get('/forgotpassword', authValidator.isLoggedOut(), function (req, res) {
    res.render('forgotPassword', {
        user: req.user,
        custSuccessMessage: req.flash('success'),
        custErrorMessage: req.flash('error')
    });
});

//login process
router.post('/login', authValidator.isLoggedOut(), register.login);

//register 
router.post('/register', authValidator.isLoggedOut(), register.register);

//forgot password
router.post('/forgot', function (req, res, next) {
    register.sendSecurityToken(req, res, next, req.body.email, forgotPasswordSuccess, forgotPasswordError);
});

function forgotPasswordError(req, res, errorMessage) {
    req.flash('error', errorMessage);
    return res.redirect('/users/forgotpassword');
}

function forgotPasswordSuccess(req, res) {
    res.redirect('/users/forgotpassword');
    return
}
router.get('/reset/:token', function (req, res) {
    register.verifySecurityToken(req, res, req.params.token, verifySecurityTokenSuccess, verifySecurityTokenError)
});

function verifySecurityTokenError(req, res, errorMessage) {
    req.flash('error', errorMessage);
    return res.redirect('/users/forgotpassword');
}

function verifySecurityTokenSuccess(req, res) {
    res.render('resetPassword', {
        user: req.user,
        custSuccessMessage: req.flash('success'),
        custErrorMessage: req.flash('error')
    });
}
router.post('/reset/:token', function (req, res) {
    register.resetPassword(req, res, req.params.token, req.body.password, resetPasswordSuccess, resetPasswordError)
});

function resetPasswordError(req, res,errorMessage){
    req.flash('error', errorMessage);
    return res.redirect('/');
}

function resetPasswordSuccess(req, res){
    return res.redirect('/');
}

//logout
router.get('/logout', authValidator.authValidator(), register.logout);

module.exports = router;