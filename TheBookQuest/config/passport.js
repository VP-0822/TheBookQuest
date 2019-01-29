const LocalStratergy = require('passport-local').Strategy;
const User = require('../models/user');
const database = require('./database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //local stratergy
    passport.use(new LocalStratergy({usernameField : 'email', passwordField : 'password'},function(email, password,done)
    {
        //match username
        let query = {email:email};
        User.findOne(query, function(err,user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'No user found'});
            }

            // match password
            bcrypt.compare(password,user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else{
                    return done(null, false, {message: 'Incorrect password'});

                }
            });
        });
    }));
    
    passport.serializeUser(function(user, done){
        done(null, {_id : user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, matriculation: user.matriculation, userId: user.userId});
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err,user){
            done(err, user);
        });
    });
}
