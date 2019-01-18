const express = require('express');
const router = express.Router();

//Bring in User Model
let User = require('../../models/user');

//Register Form
router.get('/register', function(req, res){
    res.render('register.html');
});

router.get('/login', function(req,res){
    res.render('login.html');
});

router.post('/register', function(req, res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    req.checkBody('firstname', 'First name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();

    let errors = req.validationErrors();

    if(errors){
        res.render('register.html', {
            errors:errors
        });
    } else {
        let newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email
        });

        newUser.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            else{
                req.flash('success','You are successfully registered!');
                res.redirect('/users/login');
            }
        });
    }
});

module.exports = router;