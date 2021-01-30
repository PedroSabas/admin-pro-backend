const { response } = require('express');
const bcrypt = require('bcryptjs');
//Importamos el modelo.
const Usuario = require('../models/usuario');
const generarJWT = require('../helpers/jwt');








const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google')
    res.json({
        ok: true,
        msg: 'getUsuarios',
        uid: req.uid
    });
}









const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        //Extraemos el emael del modelo.
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        //Instancia.
        const usuario = new Usuario(req.body);

        //Encryptar contraseña.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Grabamos en la base de datos, esperamos a que la promesa termine   -- usuario.save(); es una promesa
        await usuario.save();

        //GENERAR EL TOKEN - JWT.
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}









const actualizarUsuario = async(req, res = response) => {

    //obtenemos el id del usuario
    const uid = req.params.id;

    try {
        //Buscamos el usuario por el id.
        const usuarioDB = await Usuario.findById(uid);
        //Validamos que el usuario con ese id exista.
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'NO existe un usuario por ese id'
            });
        }

        //Actualizaciones.
        /*Desestructuramos los campos que no quiero extraer del modelo que es password y google, que no queremos cambiar en la BD.
        Es como decir traeme los datos del body excepto el password y el google.
        Extraemos estos campos del request.body
        */
        const { password, google, email, ...campos } = req.body;
        //validamos cuando una persona quiere cambiar un correo electronico que ya existe en la based de datos
        if (usuarioDB.email !== email) {
            //Extraemos el email de la BD
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;
        //Regresa el nuevo resultado
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}








const borrarUsuario = async(req, res = response) => {
    //Obtenemos el id del request.
    const uid = req.params.id;
    try {
        //Buscamos el usuario en la base de datos mediante su id.
        const usuarioBD = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //SI el id existe se borra el usuario.
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}






module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario

}