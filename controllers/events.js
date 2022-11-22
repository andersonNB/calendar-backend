const express = require('express')
// Importamos nuestro modelo que es el que se
// conecta con nuestra base de datos
const Evento = require('../models/Evento')


const getEventos = (req,res=express.response)=>{
     res.json({
        ok:true,
        msg:'getEventos'
     })
}


const crearEvento = async(req, res= express.response)=>{

    // console.log(req)
    //Verificar que en el body venga el evento
    console.log(req.body)

    //Creamos una instacia de nuestro modelo
    const evento = new Evento(req.body);

    try {

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


const actualizarEvento = (req, res= express.response)=>{
    res.json({
        id:"",
        ok:true,
        msg:'actualizarEvento'
    })
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