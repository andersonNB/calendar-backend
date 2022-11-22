const moment = require('moment');





//Se encarga de validar las fechas que llegan del front
//para validar las fechas utilizamos la libreria de moment
/**
 * 
 * @param {*} value -> es el valor de la fecha
 * @param {*} rest -> {req,location,path} información de la request
 */
const isDate = (value, {req,location,path})=>{

    // console.log(value)
    // console.log("req:", req)
    // console.log("location: ",location)
    // console.log("path: ", path)

    //SI no existe lo que viene de la fecha retornamos false
    if(!value){
        return false;
    }


    //volvemos la fecha que llega en un objeto moment
    const fecha = moment(value);

    if(fecha.isValid()){
        return true
    }else{
        return false
    }

}

module.exports = {isDate}