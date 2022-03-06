const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {

})

router.get('/signup', (req, res, next) => {

})

router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup',
        { passReqToCallback: true, failureMessage: true },
        function (err, user, info) {
            if (err) return next(err)
            if (user) {
                return res.json(info)
            }

            return res.status(400).json(info);
        }
    )(req, res, next);
});

router.get('/signin', (req, res, next) => {

})

router.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin',
        { passReqToCallback: true, failureMessage: true },
        function (err, user, info) {
            if (err) return next(err)
            if (user) {
                return res.json(info)
            }

            return res.status(400).json(info);
        }
    )(req, res, next);
})

router.get('/logout', (req, res, next) => {
    req.logout();
})

router.get('/friends', isAuthenticated, (req, res, next) => {
    res.json({ status: "success", friends: "luis" })
})

function isAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {

        return next();
    }
    res.status(400).json({ status: "failed", message: "User not authenticated" })
}
module.exports = router;