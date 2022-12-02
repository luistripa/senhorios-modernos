
var sqlite = require("sqlite3").verbose()

var db = new sqlite.Database("database.sqlite", sqlite.OPEN_READWRITE, err => {
    if (err)
        console.log(err);
});


module.exports = {
    createTODOListItem: createTODOListItem,
    editTODOItem: editTODOItem,
    deleteTODOItem: deleteTODOItem,
    getTODOItemById: getTODOItemById,
    getTODOList: getTODOList,
}


/**
 * Creates a new item on the house's todo list
 *
 * @param {number} houseId
 * @param {{name: string, checked: string}} item
 */
function createTODOListItem(houseId, item) {
    let sql = "INSERT INTO todoItems (houseId, name, checked) VALUES ($houseId, $name, $checked)";

    let params = {
        $houseId: houseId,
        $name: item.name,
        $checked: item.checked,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                getTODOItemById(this.lastID)
                    .then(todoItem => resolve(todoItem))
                    .catch(reason => reject(reason));
            }
        })
    })
}


function editTODOItem(itemId, newItem) {
    let sql = "UPDATE todoItems " +
        "SET name = $name, checked = $checked " +
        "WHERE id = $id"

    let params = {
        $id: itemId,
        $name: newItem.name,
        $checked: newItem.checked,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err)
                reject(err);
        })

        db.get('SELECT * FROM todoItems WHERE id = ?;', itemId, (err, row) => {
            if (err) {
                reject(err);
            } else
                resolve(row);
        })
    })
}


function deleteTODOItem(itemId) {
    let sql = "DELETE FROM todoItems WHERE id = $itemId"

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


function getTODOItemById(itemId) {
    let sql = "SELECT * FROM todoItems WHERE id = $id";

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


function getTODOList(houseId) {
    let sql = "SELECT * FROM todoItems WHERE houseId = $houseId;";

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