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
app.use(bodyParser.json())
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

//filter to add session user details in res.locals
app.use(function(req, res, next) {
    if(req.session.passport)
    {
        res.locals.user = req.session.passport.user;
    }
    next();
});

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
let users = require('./routes/signup');
app.use('/users', users);

//define routes for literature
let literatures = require('./routes/literature/literature');
app.use('/literatures', literatures);

//define routes for literatureInstance
let literatureInstances = require('./routes/literature/literatureInstance');
app.use('/literature', literatureInstances);

//define routes for reviews
let reviews = require('./routes/literature/review');
app.use('/reviews', reviews);

//define routes for literature requests
let requests = require('./routes/literature/literatureRequest');
app.use('/requests', requests);

//define routes for user profile
let user = require('./routes/user');
app.use('/user', user);

//define routes for welcome page
let menuPage = require('./routes/menu');
app.use('/', menuPage);

//start server
app.listen(3000, function(){
    console.log('I am listening....')
});