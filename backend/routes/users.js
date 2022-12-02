var express = require('express');
var router = express.Router();

var user_service = require("../db/user_service")

var auth = require("../auth/auth");


router.post('/auth', function (req, res, next) {
    // Very params
    if (!(req.body.username && req.body.password))
        return res.sendStatus(400);

    let username = req.body.username;
    let password = req.body.password;

    user_service.authenticate(username, password)
        .then(user => {
            if (user) {
                return res.header('authorization', auth.sign({user: user})).sendStatus(200)
            } else
                res.sendStatus(404);
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


/**
 * Creates a new user
 */
router.post('/', function (req, res, next) {
    // Verify params
    if (!(req.body.username && req.body.name && req.body.password && req.body.email))
        return res.sendStatus(400);

    let user = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }

    user_service.createUser(user)
        .then(value => {
            res.send(value)
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


router.get('/current', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    user_service.getUserByUserName(user.username)
        .then(currentUser => {
            if (!currentUser)
                return res.sendStatus(404);
            res.send(currentUser);
        })
        .catch(reason =>  {
            console.log(reason)
            res.status(500).send(reason.toString())
        })
})


/**
 * Get user with username
 */
router.get('/:username', function(req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    if (user.username !== req.params.username)
        return res.sendStatus(404);

    user_service.getUserByUserName(req.params.username)
        .then(searchedUser => {
            if (searchedUser)
                res.send(searchedUser);
            else
                res.sendStatus(404);
        })
        .catch(reason => res.status(500).send(reason.toString()));
});

module.exports = router;
