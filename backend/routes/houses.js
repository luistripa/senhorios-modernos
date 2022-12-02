var express = require('express');
var router = express.Router();

var house_service = require("../db/house_service");
var event_service = require("../db/event_service");
var todo_service = require("../db/todo_service");
var inventory_service = require("../db/inventory_service");


/******************************************************
 *
 *
 *      HOUSES
 *
 *
 */


router.post('/', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name && req.body.address && req.body.typology && req.body.capacity))
        return res.sendStatus(400);

    let house = {
        name: req.body.name,
        address: req.body.address,
        typology: req.body.typology,
        capacity: req.body.capacity,
        mediaId: req.body.mediaId,
    }

    return house_service.createHouse(user.id, house)
        .then(value => {
            res.send(value);
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


router.put('/:houseId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name && req.body.address && req.body.typology && req.body.capacity && req.body.image))
        return res.sendStatus(400);

    let newHouse = {
        name: req.body.name,
        address: req.body.address,
        typology: req.body.typology,
        capacity: req.body.capacity,
        image: req.body.image,
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);
            if (house.userId !== user.id)
                return res.sendStatus(404);

            house_service.editHouse(house.id, newHouse)
                .then(editedHouse => res.send(editedHouse))
                .catch(reason => res.status(500).send(reason.toString()));
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


router.delete('/:houseId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);
            if (house.userId !== user.id)
                return res.sendStatus(404); // Unauthorized, however we send a 404 because the user doesn't own the house
            house_service.deleteHouse(req.params.houseId)
                .then(() => res.sendStatus(200))
                .catch(reason => res.status(500).send(reason.toString()));
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


router.get('/list', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getUserHouses(user.id)
        .then(value => {
            res.send(value);
        })
        .catch(reason => res.status(500).send(reason.toString()));
})


router.get('/:houseId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(value => {
            if (value) {
                console.log(value, user)
                if (value.userId === user.id) {
                    res.send(value);
                } else
                    res.sendStatus(404);
            } else
                res.sendStatus(404);
        })
        .catch(reason => res.status(500).send(reason.toString()));
})


/******************************************************
 *
 *
 *      HOUSE EVENTS
 *
 *
 */


router.post('/:houseId/events/', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.type && req.body.name && req.body.startDate && req.body.endDate && req.body.repeat))
        return res.sendStatus(400);

    let event = {
        type: req.body.type,
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        repeat: req.body.repeat,
        repeatUntil: req.body.repeatUntil,
    }

    house_service.getHouseById(req.params.houseId) // Check if house exists
        .then(house => {
            if (house) {
                if (house.userId === user.id) // User is owner of the house
                    event_service.createEvent(house.id, event)
                        .then(event => res.send(event))
                        .catch(reason => res.status(500).send(reason.toString()));
                else
                    res.sendStatus(404);
            } else
                res.sendStatus(404);
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


router.put('/:houseId/events/:eventId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name || req.body.description || req.body.startDate || req.body.endDate || req.body.repeat || req.body.repeatUntil))
        return res.sendStatus(400);

    let newEvent = {
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        repeat: req.body.repeat,
        repeatUntil: req.body.repeatUntil,
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);
            if (house.userId !== user.id)
                return res.sendStatus(404);

            event_service.getEventById(req.params.eventId)
                .then(event => {
                    if (!event)
                        return res.sendStatus(404);
                    if (event.houseId !== house.id)
                        return res.sendStatus(404);

                    event_service.editEvent(event.id, newEvent)
                        .then(editedEvent => res.send(editedEvent))
                        .catch(reason => res.status(500).send(reason.toString()));
                })
        })
        .catch(reason => res.status(500).send(reason.toString()))
});


router.delete('/:houseId/events/:eventId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);
            if (house.userId !== user.id)
                return res.sendStatus(404);
            event_service.getEventById(req.params.eventId)
                .then(event => {
                    if (!event)
                        return res.sendStatus(404);
                    if (event.houseId !== house.id)
                        return res.sendStatus(404);
                    event_service.deleteEvent(event.id)
                        .then(() => res.sendStatus(200))
                        .catch(reason => res.status(500).send(reason.toString()));
                })
        })
        .catch(reason => res.status(500).send(reason.toString()));
})


/**
 * Get Event List for an house
 */
router.get('/:houseId/events/list', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId) // Check if house exists
        .then(value => {
            if (value) {
                if (value.userId === user.id) // User is owner of the house
                    event_service.getHouseEvents(req.params.houseId)
                        .then(value => res.send(value))
                        .catch(reason => res.status(500).send(reason.toString()));
                else
                    res.sendStatus(404);
            } else
                res.sendStatus(404);
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


/**
 * Get Event By Id
 */
router.get('/:houseId/events/:eventId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            event_service.getEventById(req.params.eventId)
                .then(event => {
                    if (!event)
                        return res.sendStatus(404);
                    if (event.houseId !== house.id)
                        return res.sendStatus(404);
                    res.send(event)
                })
                .catch(reason => res.status(500).send(reason.toString()));
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


/******************************************************
 *
 *
 *      HOUSE TODO LIST
 *
 *
 */


router.post('/:houseId/todo', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name && typeof req.body.checked === "boolean"))
        return res.sendStatus(400);

    let todoItem = {
        name: req.body.name,
        checked: req.body.checked,
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (house) {
                if (house.userId !== user.id)
                    return res.sendStatus(404);

                todo_service.createTODOListItem(house.id, todoItem)
                    .then(itemId => res.send(itemId))
                    .catch(reason => res.status(500).send(reason.toString()));

            } else {
                res.sendStatus(404);
            }
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


router.put('/:houseId/todo/:itemId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name && typeof req.body.checked === "boolean"))
        return res.sendStatus(400);

    let newTodoItem = {
        name: req.body.name,
        checked: req.body.checked,
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            todo_service.getTODOItemById(req.params.itemId)
                .then(todoItem => {
                    if (!todoItem)
                        return res.sendStatus(404);

                    if (todoItem.houseId !== house.id)
                        return res.sendStatus(404);

                    todo_service.editTODOItem(todoItem.id, newTodoItem)
                        .then(editedItem => res.send(editedItem))
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


/**
 * Get TODO List of house
 */
router.get('/:houseId/todo', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            todo_service.getTODOList(house.id)
                .then(todoList => res.send(todoList))
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
})

/**
 * Delete TODO item
 */
router.delete('/:houseId/todo/:itemId/delete', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            todo_service.getTODOItemById(req.params.itemId)
                .then(todoItem => {
                    if (!todoItem)
                        return res.sendStatus(404);

                    if (todoItem.houseId !== house.id)
                        return res.sendStatus(404);

                    todo_service.deleteTODOItem(todoItem.id)
                        .then(() => res.sendStatus(200))
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


/******************************************************
 *
 *
 *      HOUSE INVENTORY - INVENTORY
 *
 *
 */


// Create division
router.post('/:houseId/inventory', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name))
        return res.sendStatus(400);

    let newDivision = {
        name: req.body.name,
        mediaId: req.body.mediaId
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.createInventoryDivision(house.id, newDivision)
                .then(divisionId => res.send(divisionId))
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


router.put('/:houseId/inventory/:inventoryId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name))
        return res.sendStatus(400);

    let newDivision = {
        name: req.body.name,
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionById(req.params.inventoryId)
                .then(division => {
                    if (!division)
                        return res.sendStatus(404);

                    if (division.houseId !== house.id)
                        return res.sendStatus(404);

                    inventory_service.editInventoryDivision(division.id, newDivision)
                        .then(newDivision => res.send(newDivision))
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
});


router.delete('/:houseId/inventory/:divisionId/delete', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionById(req.params.divisionId)
                .then(division => {

                    if (!division)
                        return res.sendStatus(404);

                    if (division.houseId !== house.id)
                        return res.sendStatus(404);

                    inventory_service.deleteInventoryDivision(division.id)
                        .then(() => res.sendStatus(200))
                        .catch(reason => res.status(500).send(reason.toString()));
                })
                .catch(reason => res.status(500).send(reason.toString()));
        })
        .catch(reason => res.status(500).send(reason.toString()));

});


router.get('/:houseId/inventory/list', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionsForHouse(house.id)
                .then(divisionList => res.send(divisionList))
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


/******************************************************
 *
 *
 *      HOUSE INVENTORY - DIVISION ITEMS
 *
 *
 */


router.post('/:houseId/inventory/:divisionId/items/', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name && req.body.count))
        return res.sendStatus(400);

    let item = {
        name: req.body.name,
        count: req.body.count,
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionById(req.params.divisionId)
                .then(division => {
                    if (!division)
                        return res.sendStatus(404);

                    if (division.houseId !== house.id)
                        return res.sendStatus(404);

                    inventory_service.createInventoryItem(division.id, item)
                        .then(itemId => res.send(itemId))
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
});


router.put('/:houseId/inventory/:divisionId/items/:itemId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    // Verify params
    if (!(req.body.name && req.body.count))
        return res.sendStatus(400);

    let newItem = {
        name: req.body.name,
        count: req.body.count,
    }

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionById(req.params.divisionId)
                .then(division => {
                    if (!division)
                        return res.sendStatus(404);

                    if (division.houseId !== house.id)
                        return res.sendStatus(404);

                    inventory_service.getInventoryItemById(req.params.itemId)
                        .then(item => {
                            if (!item)
                                return res.sendStatus(404);

                            if (item.divisionId !== division.id)
                                return res.sendStatus(404);

                            inventory_service.editInventoryItem(item.id, newItem)
                                .then(newItem => res.send(newItem))
                                .catch(reason => res.status(500).send(reason.toString()))
                        })
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
});


router.delete('/:houseId/inventory/:divisionId/items/:itemId/delete', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionById(req.params.divisionId)
                .then(division => {
                    if (!division)
                        return res.sendStatus(404);

                    if (division.houseId !== house.id)
                        return res.sendStatus(404);

                    inventory_service.deleteInventoryItem(req.params.itemId)
                        .then(() => res.sendStatus(200))
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
});


router.get('/:houseId/inventory/:divisionId/items/list', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionById(req.params.divisionId)
                .then(division => {
                    if (!division)
                        return res.sendStatus(404);

                    if (division.houseId !== house.id)
                        return res.sendStatus(404);

                    inventory_service.getDivisionItems(division.id)
                        .then(divisionItems => res.send(divisionItems))
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
})


router.get('/:houseId/inventory/:divisionId/items/:itemId', function (req, res, next) {
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    house_service.getHouseById(req.params.houseId)
        .then(house => {
            if (!house)
                return res.sendStatus(404);

            if (house.userId !== user.id)
                return res.sendStatus(404);

            inventory_service.getInventoryDivisionById(req.params.divisionId)
                .then(division => {
                    if (!division)
                        return res.sendStatus(404);

                    if (division.houseId !== house.id)
                        return res.sendStatus(404);

                    inventory_service.getInventoryItemById(req.params.itemId)
                        .then(item => {
                            if (!item)
                                return res.sendStatus(404);

                            if (item.divisionId !== division.id)
                                return res.sendStatus(404);

                            res.send(item);
                        })
                        .catch(reason => res.status(500).send(reason.toString()))
                })
                .catch(reason => res.status(500).send(reason.toString()))
        })
        .catch(reason => res.status(500).send(reason.toString()))
});



module.exports = router;