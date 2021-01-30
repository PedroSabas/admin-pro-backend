const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');

    //Si no existe el token nos regresa una respuesta incorrecta.
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'NO hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        uid = req.uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}