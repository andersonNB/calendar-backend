const express = require('express')
// Importamos nuestro modelo que es el que se
// conecta con nuestra base de datos
const Evento = require('../models/Evento')


const getEventos = async (req,res=express.response)=>{

    //utilizamos el .find en nuestro modulo y que nos
    //traiga todos los eventos que existan en la bd
    //en el .find tambien le podemos agregar filtros
    //con el populate podemos especificar que datos 
    //a traves del id por el cual se identica el objeto
    //y traernos así sus propieades

    const eventos  = await Evento.find()
                            .populate('user','name')


     res.json({
        ok:true,
        msg:'getEventos',
        eventos,
     })
}


const crearEvento = async(req, res= express.response)=>{

    // console.log(req)
    //Verificar que en el body venga el evento
    console.log(req.body)

    //Creamos una instacia de nuestro modelo
    const evento = new Evento(req.body);

    try {

        //la req tiene el uid ya que nosotros se la agreamos
        //en el momento en el que creamos el token
        evento.user = req.uid

        //save()-> es una tarea asincrona
        const eventoGuardado = await evento.save();

        res.json({
            ok:true,
            evento: eventoGuardado,
        })

        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador.'
        })


    }

    // UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    //Si sale ese erro es por que hay doble response positiva
    // res.json(
    //     {
    //         ok:true,
    //         msg:'crearEvento'
    //     }
    // )
    
}


const actualizarEvento = async(req, res= express.response)=>{

    //Debemos obtener el id que viene de la req
    const eventoId = req.params.id;

    //obtenemos el uid de la requst
    const uid = req.uid;

    //utilizamos un trycatch por si existen
    //errores al conectarse con la bd
    try {
        //las funciones de nuestro modelo de moongse
        //son asincronas
        const evento = await Evento.findById(eventoId)


        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id',
            })
        }

        //Si es la misma persona que creo 
        //el evento permitimos dejarlo guarda la info
        if(evento.user.toString() !== uid){

            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento',
            });

        }

        //Desestructuramos todo lo que viene en el body de la request
        // y le agregamos el uid
        const nuevoEvento = {
            ...req.body,
            user:uid,
        }

        //Si no le ponemos el {new:true} entonces nos regresara el objeto anterior
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true})

        res.json({
            ok:true,
            evento:eventoActualizado,
        })


                
    } catch (error) {
        
        console.log(error)


        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
        })

    }


    // res.json({
    //     ok:true,
    //     msg:'actualizarEvento',
    //     eventoId,
    // })
}


const eliminarEvento = (req, res= express.response)=>{
    // console.log(req.params)
    res.json({
        id:req.params.id,
        ok:true,
        msg:'eliminarEvento'
    })
}

module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}