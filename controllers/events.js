const express = require('express')


const getEventos = (req,res=express.response)=>{
     res.json({
        ok:true,
        msg:'getEventos'
     })
}


const crearEvento = (req, res= express.response)=>{

    res.json(
        {
            ok:true,
            msg:'crearEvento'
        }
    )
    
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