/*

    Ruta: /api/usuarios

*/

//El Router nos va a permitir configurar mis rutas.
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//Importamos los controladores.
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const router = Router();

router.get('/', validarJWT, getUsuarios);



//Dentro de los corchetes van varios middlewares que queremos que se ejecuten antes de llegar al controlador.
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    //Nuestro middlewares personalizados.
    validarCampos
], crearUsuario);



router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    //Middleware personalizado.
    validarCampos
], actualizarUsuario);



router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;