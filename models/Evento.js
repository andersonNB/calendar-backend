const {Schema, model} = require('mongoose')

const EventoSchema = Schema({
   
    title:{
        type:String,
        require: true,
    },
    notes:{
        type:String,
    },
    start:{
        type:Date,
        require: true,
    },
    end:{
        type:Date,
        require:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
    // esta ultima propiedad referencia al esqueme de usuarios
    // que se creo y apunta a su id

})


module.exports =model('Evento', EventoSchema)