const register = require('../controllers/auth/register')
const express = require('express');
const router = express.Router();
const authValidator = require('../controllers/auth/authValidator');

//Register Form
router.get('/register', authValidator.isLoggedOut(), function(req, res){
    res.render('register', { custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/login', authValidator.isLoggedOut(), function(req,res){
    res.render('login', { custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

//login process
router.post('/login', authValidator.isLoggedOut(), register.login);

//register 
router.post('/register', authValidator.isLoggedOut(), register.register);

module.exports = router;