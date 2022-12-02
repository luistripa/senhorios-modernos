var sqlite = require("sqlite3").verbose()

var db = new sqlite.Database("database.sqlite", sqlite.OPEN_READWRITE, err => {
    if (err)
        console.log(err);
});

module.exports = {
    createEvent: createEvent,
    editEvent: editEvent,
    deleteEvent: deleteEvent,
    getEventById: getEventById,
    getHouseEvents: getHouseEvents,
    getAllActiveEvents: getAllActiveEvents,
    getAllEventsForUser: getAllEventsForUser,
}


/**
 * Create an event for a given house.
 *
 * @param {number} houseId The id of the house
 * @param {{type: string, name: string, description: string, startDate: string, endDate: string, repeat: string, repeatUntil: string|null}} event An event object
 * @returns {Promise<number>}
 */
function createEvent(houseId, event) {
    let sql = "INSERT INTO events (houseId, type, name, description, startDate, endDate, repeat, repeatUntil) VALUES" +
        " ($houseId, $type, $name, $description, datetime($startDate), datetime($endDate), $repeat, date($repeatUntil));"

    let params = {
        $houseId: houseId,
        $type: event.type,
        $name: event.name,
        $description: event.description,
        $startDate: event.startDate,
        $endDate: event.endDate,
        $repeat: event.repeat,
        $repeatUntil: event.repeatUntil,
    }

    return new Promise(function(resolve, reject) {
        db.run(sql, params, function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                getEventById(this.lastID)
                    .then(event => resolve(event))
                    .catch(reason => reject(reason));
            }
        })
    })
}


/**
 * Edits an event.
 *
 * @param {number} eventId
 * @param {{name: string, description: string, startDate: string, endDate: string, repeat: string, repeatUntil: string}} newEvent
 * @returns {Promise<{id: number, houseId: number, name: string, description: string, startDate: string, endDate: string, repeat: string, repeatUntil: string}>}
 */
function editEvent(eventId, newEvent) {
    let sql = "UPDATE events " +
        "SET name = $name, description = $description, startDate = datetime($startDate), " +
        "endDate = datetime($endDate), repeat = $repeat, repeatUntil = date($repeatUntil) " +
        "WHERE id = $id;"

    let params = {
        $id: eventId,
        $name: newEvent.name,
        $description: newEvent.description,
        $startDate: newEvent.startDate,
        $endDate: newEvent.endDate,
        $repeat: newEvent.repeat,
        $repeatUntil: newEvent.repeatUntil,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err)
                reject(err);
        })

        db.get('SELECT * FROM events WHERE id = ?;', eventId, (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            } else
                resolve(row);
        })
    })
}


/**
 * Deletes and event from the database.
 *
 * @param {number} eventId The id of the event.
 * @returns {Promise<undefined>}
 */
function deleteEvent(eventId) {
    let sql = "DELETE FROM events WHERE id = $eventId";

    let params = {
        $eventId: eventId,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else
                resolve()
        })
    })
}


/**
 * Get an event by id.
 *
 * @param {number} eventId The id of the event
 * @returns {Promise<{houseId: number, name: string, description: string, startDate: string, endDate: string, repeat: string, repeatUntil: string|null}>}
 */
function getEventById(eventId) {
    let sql = "SELECT * FROM events e WHERE e.id = $eventId";

    let params = {
        $eventId: eventId,
    }

    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            } else
                resolve(row)
        })
    })
}


/**
 * Gets all events of a given house.
 *
 * @param houseId The id of the house
 * @returns {Promise<{name: string, description: string, startDate: string, endDate: string, repeat: string, repeatUntil: string|null}[]>}
 */
function getHouseEvents(houseId) {
    let sql = "SELECT h.id as houseId, e.ID, e.type, e.name, e.description, e.startDate, e.endDate, e.repeat, e.repeatUntil " +
        "FROM events e INNER JOIN houses h ON e.houseId = h.id WHERE h.id = $houseId;";

    let params = {
        $houseId: houseId,
    }

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            } else
                resolve(rows);
        })
    })
}


/**
 * Get all events whose either enDate or repeatUntil attributes are greater than or equal to the current date.
 *
 * @param {number} userId The user id to which the events belong to
 * @returns {Promise<unknown>}
 */
function getAllActiveEvents(userId) {
    // FIXME: There's a problem here
    let sql = "SELECT e.id, e.houseId, e.name, e.description, e.startDate, e.endDate, e.repeat, e.repeatUntil FROM events e " +
        "INNER JOIN houses h on h.id = e.houseId " +
        "WHERE h.userId = $userId AND date(e.endDate) >= date('now') OR date(e.repeatUntil) >= date('now');";

    let params = {
        $userId: userId,
    }

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            } else
                resolve(rows);
        })
    })
}


function getAllEventsForUser(userId) {
    // FIXME: There's a problem here
    let sql = "SELECT events.id, events.houseId, events.type, events.name, events.description," +
        "events.startDate, events.endDate, events.repeat, events.repeatUntil FROM events " +
        "INNER JOIN houses h ON events.houseId = h.id " +
        "WHERE h.userId = $userId;";

    let params = {
        $userId: userId,
    }

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            } else
                resolve(rows);
        })
    })
}