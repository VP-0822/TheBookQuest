const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const mongoose= require('mongoose');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const database = require('./config/database');
mongoose.connect(database.database);
//mongoose.connect('mongodb://localhost/thebook');

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
app.use(flash());

//Express messages middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

//Express validator middleware
app.use(expressValidator({
    errorFormatter : function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//define controller for users
let users = require('./controllers/auth/register');
app.use('/users', users);

//define routes for welcome page
let welcomePage = require('./controllers/welcome');
app.use('/', welcomePage);

//start server
app.listen(3000, function(){
    console.log('I am listening....')
});