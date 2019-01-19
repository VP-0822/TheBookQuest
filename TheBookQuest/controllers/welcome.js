const express = require('express');
const router = express.Router();
const authValidator = require('/auth/authValidator');

router.get('/welcome', authValidator.authValidator(), function(req, res){
    res.render('welcome',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

module.exports = router;