const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {
    return new Promise(() => {
        const payload = {
            uid
        };

        //sign es para crear el token.
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });

}



module.exports = {
    generarJWT
}