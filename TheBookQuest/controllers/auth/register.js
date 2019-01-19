const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Bring in User Model
let User = require('../../models/user');

//Register Form
router.get('/register', function(req, res){
    res.render('register', { custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.get('/login', function(req,res){
    res.render('login', { custSuccessMessage : req.flash('success'), custErrorMessage : req.flash('error')});
});

router.post('/register', function(req, res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const dob = req.body.dob;
    const maticulation = req.body.maticulation;
    const password = req.body.password;
    const confirm = req.body.confirm;

    req.checkBody('firstname', 'First name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('dob','Date of Birth is required').notEmpty();
    req.checkBody('maticulation','Maticulation Number is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('confirm','Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    
    if(errors){
        console.log(errors);
        res.render('register', {
            custErrorMessage:errors
        });
    } else {
        var newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            dob: dob,
            maticulation:maticulation,
            password: password
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
});

module.exports = router;