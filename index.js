const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
var db = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const body_parser = require('body-parser')

//define app
var app = express();


var SequelizeStore = require('connect-session-sequelize')(session.Store);
var myStore = new SequelizeStore({
    db: db.sequelize
})
myStore.sync();

//use sessions and cookies
app.use(cookieParser())
app.use(session(
    {
        secret : 'ant123',
        resave : false,
        saveUninitialized : true,
        store: myStore,
    }
));

//set ejs engine & views DIR
app.set('view engine', 'ejs');
app.set('views', 'app/views');

//set Directory for public files
app.use(express.static(path.join(__dirname, 'app', 'public')));
app.use(express.static(path.join(__dirname, 'app', 'views')))

//get values from post request
app.use(body_parser.urlencoded({extended: false}));
//app.use(body_parser.json());

app.get('/', (req, res) => {
    if (req.session.user != undefined) {
        res.redirect('/home')
    }
    else{
        res.render('home', {
            content: 'Welcome User',
        });
    }
})

app.get('/logout', (req, res) => {
    if (req.session.user != undefined) {
        req.session.destroy()
        res.redirect('/')
    }
    else{
        res.redirect('/')
    }
})

app.get('/login', (req, res) => {
    if (req.session.user != undefined) {
        res.redirect('/home')
    }
    else {
        res.render('login', {
            content: 'Login!',
            content2: 'Welcome Back User',
            formid : '/login',
        });
    }
})

app.post('/login', (req, res) =>{
    console.log('1234235');
    console.log('1234235');
    console.log('1234235');
    console.log('1234235');
    console.log('1234235');
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){
    db.users.count({ where: { email: username, password: hash} })
    .then((count) => {
        if (count==1){
            req.session.user = username;
            res.redirect('/home')
        }
        else {
            res.redirect('/login')
            }
        })
    })
})

app.get('/signup', (req, res) => {
    if (req.session.user != undefined) {
        res.redirect('/home')
    }
    else {
        res.render('login', {
            content: 'SignUp',
            content2: 'Sign up to see photos and videos from your friends.',
            formid : '/signup',
        });
    }
})

app.post('/signup', (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){ // the hash allows the password to be private 
        db.users.create({email:username, password: hash})
            .then(() => {
                req.session.username = username;
                res.redirect('/home')
            }).error((e) => {
                console.log(e);
                res.redirect('/signup');
            })
        });
})

app.get('/home', (req, res) => {
    res.render('home', {
        content: 'Logged In!',
        content2: 'Welcome Back User',
        formid : '/login',
    });
})

app.listen(3001, function(){
    console.log(path.join(__dirname, 'public'))
    console.log('Server Running on 3001...');
});