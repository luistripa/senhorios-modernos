var jwt = require('jsonwebtoken');


let secret = "this is a secret"; // TODO: Make this a bit more safe :)




module.exports = {
    sign: sign,
    validate: validate,
    authHandler: authHandler,
}

function sign(payload) {
    return jwt.sign(payload, secret, {expiresIn: '7 days'});
}

function validate(token) {
    return jwt.verify(token, secret);
}

function authHandler(req, res, next) {
    let token = req.header('authorization');

    req.session = {}

    if (token) {
        let payload = validate(token);
        if (payload)
            req.session = payload;
    }

    next();
}