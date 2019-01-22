const express = require('express');
const router = express.Router();
const authValidator = require('../controllers/auth/authValidator');

router.get('/welcome', authValidator.authValidator(), function(req, res){
    res.render('welcome',{ custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/',  function(req, res){
    res.send('Work In Progress!!');
})

module.exports = router;