const {Schema, model} = require('mongoose')

const EventoSchema = Schema({
   
    title:{
        type:String,
        required: true,
    },
    notes:{
        type:String,
    },
    start:{
        type:Date,
        required: true,
    },
    end:{
        type:Date,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,
    }
    // esta ultima propiedad referencia al esqueme de usuarios
    // que se creo y apunta a su id

})
//Con esta sintaxis lo que hacemos es modificar 
//el comportamiento del serializador que trae moongose
//el toJSON
EventoSchema.method('toJSON', function(){

    //con el this obtenemos acceso al objeto
    //que se esta serializando en el momento
    // {
    //     "ok": true,
    //     "evento": {
    //         "title": "Cumpleaños del JEfe",
    //         "notes": "Comprar pastel",
    //         "start": "1970-01-01T00:00:00.001Z",
    //         "end": "1970-01-01T00:16:40.000Z",
    //         "_id": "637c3770eadfd07497c4754a",
    //         "user": "63698f7538499c798bfd264a",
    //         "__v": 0
    //     }
    // }
    const {__v,_id,...object} =  this.toObject();

    //Sobreescribimos la propiedad _id por id
    object.id = _id;
    return object;

})


module.exports =model('Evento', EventoSchema)