const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('../models/person');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const person = await Person.findById(id);
    done(null, person);
});

// Sign Up
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    // Email already registered ?
    const person = await Person.findOne({ email: email });
    if (person) {
        return done(null, false, { status: "failed", message: "Email already registered" })
    }

    // Save new person
    const newPerson = new Person();
    newPerson.email = email;
    newPerson.password = newPerson.encryptPassword(password);
    newPerson.name = req.body.name;
    await newPerson.save()

    return done(null, newPerson, { status: "success" })
}))

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    // Email exist ?
    const person = await Person.findOne({ email: email });
    if (!person) {
        return done(null, false, { status: "failed", message: "Not Email found" })
    }

    if (!person.comparePassword(password)) {
        return done(null, false, { status: "failed", message: "Incorrect password" })
    }
    return done(null, person, { status: "success" })

}))