var express = require('express');
var router = express.Router();

var event_service = require("../db/event_service")


router.get('/today', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        res.sendStatus(401);

    event_service.getAllActiveEvents(user.id)
        .then(events => {
            // TODO: Check which events are today
            res.send(events);
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


/**
 * Get all events of user
 */
router.get('/all', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    event_service.getAllEventsForUser(user.id)
        .then(events => res.send(events))
        .catch(reason => res.status(500).send(reason.toString()));
})

module.exports = router;