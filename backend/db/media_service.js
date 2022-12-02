var sqlite = require("sqlite3").verbose()

var db = new sqlite.Database("database.sqlite", sqlite.OPEN_READWRITE, err => {
    if (err)
        console.log(err);
});


module.exports = {
    savePhoto: savePhoto,
    getPhotoInfoById: getPhotoInfoById,
}

function savePhoto(photo) {
    let sql = "INSERT INTO media (path, mimeType) VALUES ($path, $mimeType)"

    let params = {
        $path: photo.path,
        $mimeType: photo.mimeType
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                getPhotoInfoById(this.lastID)
                    .then(media => resolve(media))
                    .catch(reason => reject(reason));
            }
        })
    })
}

function getPhotoInfoById(photoId) {
    let sql = "SELECT * FROM media WHERE id = $photoId";

    let params = {
        $photoId: photoId,
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