

var sqlite = require("sqlite3").verbose()

var db = new sqlite.Database("database.sqlite", sqlite.OPEN_READWRITE, err => {
    if (err)
        console.log(err);
});

module.exports = {
    authenticate: authenticate,
    createUser: createUser,
    getUserByUserName: getUserByUserName,
}

/**
 * Authenticates the user with the specified username and password.
 *
 * @param username
 * @param password
 * @returns {Promise<{id: number, username: string, password: string, email: string}>}
 */
function authenticate(username, password) {
    let sql = "SELECT * FROM users WHERE username = $username AND password = $password";

    let params = {
        $username: username,
        $password: password,
    }

    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            } else
                resolve(row);
        })
    })
}



function createUser(user) {
    let sql = "INSERT INTO users (username, name, password, email) VALUES ($username, $name, $password, $email);";

    let params = {
        $username: user.username,
        $name: user.name,
        $password: user.password,
        $email: user.email,
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                getUserByUserName(user.username)
                    .then(newUser => resolve(newUser))
                    .catch(reason => reject(reason))
            }
        })
    });
}


function getUserByUserName(username) {
    let sql = "SELECT * FROM users WHERE username = $username";

    let params = {
        $username: username,
    }

    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            }else
                resolve(row);
        })
    })
}

