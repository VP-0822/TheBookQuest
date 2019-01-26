const bcrypt = require('bcryptjs');
const passport = require('passport');
const randomstring = require("randomstring");

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
        User.find({userId : userId}).lean().exec(function(err, result){
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

//module.exports = {register: require('.')}