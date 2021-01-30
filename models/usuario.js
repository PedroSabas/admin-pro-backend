const { model, Schema } = require('mongoose');
//Creamos el modelo del usuario, definicion del schema.
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});


//Configuracion adicional para el id le quita el guion bajo que le agrega por defecto mongoose.
UsuarioSchema.method('toJSON', function() {
    //agregando el password en la contaste para no garegar el password, la password se extrae del objecto
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})





//Exportamos el shcema y la tabla del shema es Usuario 
module.exports = model('Usuario', UsuarioSchema);