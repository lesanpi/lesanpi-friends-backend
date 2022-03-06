const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const { secret } = require('./keys')
// Initialization
const app = express();
require('./database');
require('./passport/local-auth')

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // receive data from client
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

