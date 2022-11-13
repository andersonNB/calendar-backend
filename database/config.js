//Archivo con la configuración respectiva de la bd
const mongoose = require('mongoose');


const dbConnection = async()=>{

    try{
        mongoose.connect(process.env.DB_CNN);
        console.log('DB Online')

    }catch(error){
        console.log(error)
        throw new Error('Error al inicializar la base de datos')
    }

}

module.exports= {
    dbConnection
}