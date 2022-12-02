
var sqlite = require("sqlite3").verbose()

var db = new sqlite.Database("database.sqlite", sqlite.OPEN_READWRITE, err => {
    if (err)
        console.log(err);
});

module.exports = {
    createHouse: createHouse,
    editHouse: editHouse,
    deleteHouse: deleteHouse,
    getHouseById: getHouseById,
    getUserHouses: getUserHouses,
}


/**
 * Creates a new house for the given user.
 *
 * @param {number} userId
 * @param {{name: string, address: string, image: string}} house
 */
function createHouse(userId, house) {
    let sql = "INSERT INTO houses (userId, name, address, typology, capacity, mediaId) VALUES ($userId, $houseName, $houseAddress, $typology, $capacity, $mediaId)";

    let params = {
        $userId: userId,
        $houseName: house.name,
        $houseAddress: house.address,
        $typology: house.typology,
        $capacity: house.capacity,
        $mediaId: house.mediaId
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                getHouseById(this.lastID)
                    .then(house => resolve(house))
                    .catch(reason => resolve(reason));
            }
        })
    })
}


/**
 * Edits an house.
 *
 * @param {number} houseId
 * @param {{name: string, address: string, image: string}} newHouse
 * @returns {Promise<{id: number, name: string, image: string}>}
 */
function editHouse(houseId, newHouse) {
    let sql = "UPDATE houses " +
        "SET name = $name, address = $address, typology = $typology, capacity = $capacity, mediaId = $mediaId " +
        "WHERE id = $id"

    let params = {
        $id: houseId,
        $name: newHouse.name,
        $address: newHouse.address,
        $mediaId: newHouse.mediaId,
        $typology: newHouse.typology,
        $capacity: newHouse.capacity
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err)
                reject(err);
        })

        db.get('SELECT * FROM houses WHERE id = ?;', houseId, (err, row) => {
            if (err) {
                reject(err);
            } else
                resolve(row);
        })
    })
}


/**
 * Gets the house with the given id.
 *
 * @param houseId The id of the house
 * @returns {Promise<{id: number, userId: number, name: string, address: string, image: string}>}
 */
function getHouseById(houseId) {
    let sql = "SELECT * FROM houses WHERE id = $id";

    let params = {
        $id: houseId,
    }

    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else
                resolve(row);
        })
    })
}


/**
 * Gets all houses from a given user.
 *
 * @param {number} userId
 */
function getUserHouses(userId) {
    let sql = "SELECT * FROM houses WHERE userId = $userId;";

    let params = {
        $userId: userId,
    }

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else
                resolve(rows)
        })
    })
}


/**
 * Deletes an house from the database.
 * @param houseId
 * @returns {Promise<unknown>}
 */
function deleteHouse(houseId) {
    let sql = "DELETE FROM houses WHERE id = $houseId"

    let params = {
        $houseId: houseId
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) {
                reject(err);
            } else
                resolve();
        })
    })
}
