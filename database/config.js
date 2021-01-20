//Hacemos configuración de mongoose.
const mongoose = require('mongoose');

//async debuelve una promesa, hace que toda la funcion retorn una promesa.
const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }

}

module.exports = {
    dbConnection
}