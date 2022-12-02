
var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer({dest: "public/images"})

const media_service = require("../db/media_service");
const fs = require("fs");
const path = require("path");


router.post('/', upload.single("photo"), function (req, res, next) {
    console.log(req.file)
    let user = req.session.user;
    if (!user)
        return res.sendStatus(401);

    let photo = {
        path: req.file.path,
        mimeType: req.file.mimetype,
    }

    media_service.savePhoto(photo)
        .then(mediaInfo => {
            res.send(mediaInfo);
        })
        .catch(reason => res.status(500).send(reason.toString()));
});


router.get('/:id', function (req, res, next) {

    media_service.getPhotoInfoById(req.params.id)
        .then(photo => {
            if (!photo)
                return res.sendStatus(404);

            console.log(path.join(__dirname, photo.path))
            res.contentType(photo.mimeType).sendFile(path.join(__dirname, "../"+photo.path), err => console.error(err));
        })
})


module.exports = router;