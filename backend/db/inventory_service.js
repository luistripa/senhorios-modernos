var sqlite = require("sqlite3").verbose()

var db = new sqlite.Database("database.sqlite", sqlite.OPEN_READWRITE, err => {
    if (err)
        console.log(err);
});


module.exports = {
    createInventoryDivision: createInventoryDivision,
    editInventoryDivision: editInventoryDivision,
    deleteInventoryDivision: deleteInventoryDivision,
    getInventoryDivisionById: getInventoryDivisionById,
    getInventoryDivisionsForHouse: getInventoryDivisionsForHouse,

    getDivisionItems: getDivisionItems,
    createInventoryItem: createInventoryItem,
    editInventoryItem: editInventoryItem,
    deleteInventoryItem: deleteInventoryItem,
    getInventoryItemById: getInventoryItemById,
}


function createInventoryDivision(houseId, division) {
    let sql = "INSERT INTO divisions (houseId, name, mediaId) VALUES ($houseId, $name, $mediaId)";

    let params = {
        $houseId: houseId,
        $name: division.name,
        $mediaId: division.mediaId
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                getInventoryDivisionById(this.lastID)
                    .then(division => resolve(division))
                    .catch(reason => reject(reason));
            }
        })
    })
}


function editInventoryDivision(divisionId, newDivision) {
    let sql = "UPDATE divisions SET name = $name WHERE id = $id"

    let params = {
        $id: divisionId,
        $name: newDivision.name,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err)
                reject(err);
        })

        db.get('SELECT * FROM todoItems WHERE id = ?;', divisionId, (err, row) => {
            if (err) {
                reject(err);
            } else
                resolve(row);
        })
    })
}


function deleteInventoryDivision(divisionId) {
    let sql = "DELETE FROM divisions WHERE id = $itemId"

    let params = {
        $itemId: divisionId
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


function getInventoryDivisionById(divisionId) {
    let sql = "SELECT * FROM divisions WHERE id = $id";

    let params = {
        $id: divisionId,
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


function getInventoryDivisionsForHouse(houseId) {
    let sql = "SELECT * FROM divisions WHERE houseId = $houseId;";

    let params = {
        $houseId: houseId,
    }

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else
                resolve(rows);
        })
    })
}


function getDivisionItems(divisionId) {
    let sql = "SELECT * FROM division_items WHERE divisionId = $divisionId;";

    let params = {
        $divisionId: divisionId,
    }

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else
                resolve(rows);
        })
    })
}


function createInventoryItem(divisionId, newItem) {
    let sql = "INSERT INTO division_items (divisionId, name, count) VALUES ($divisionId, $name, $count)";

    let params = {
        $divisionId: divisionId,
        $name: newItem.name,
        $count: newItem.count,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                getInventoryItemById(this.lastID)
                    .then(item => resolve(item))
                    .catch(reason => reject(reason));
            }
        })
    })
}


function editInventoryItem(itemId, newItem) {
    let sql = "UPDATE division_items SET name = $name, count = $count WHERE id = $id"

    let params = {
        $id: itemId,
        $name: newItem.name,
        $count: newItem.count,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err)
                reject(err);
        })

        db.get('SELECT * FROM division_items WHERE id = ?;', itemId, (err, row) => {
            if (err) {
                reject(err);
            } else
                resolve(row);
        })
    })
}


function deleteInventoryItem(itemId) {
    let sql = "DELETE FROM division_items WHERE id = $itemId"

    let params = {
        $itemId: itemId
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


function getInventoryItemById(itemId) {
    let sql = "SELECT * FROM division_items WHERE id = $id";

    let params = {
        $id: itemId,
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
