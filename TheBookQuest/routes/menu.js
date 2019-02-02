const express = require('express');
const router = express.Router();
const authValidator = require('../controllers/auth/authValidator');

router.get('/welcome', authValidator.authValidator(), function(req, res){
    res.render('welcome',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/request', authValidator.authValidator(), function(req, res){
    res.render('request',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/contact', authValidator.authValidator(), function(req, res){
    res.render('contact',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/profile', authValidator.authValidator(), function(req, res){
    res.render('yourProfile',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/orders', authValidator.authValidator(), function(req, res){
    res.render('yourOrders',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/yourRequests', authValidator.authValidator(), function(req, res){
    res.render('yourRequests',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/',  function(req, res){
    res.redirect('/welcome');
})

module.exports = router;