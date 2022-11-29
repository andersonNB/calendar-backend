const {response} = require('express')
const { validationResult } = require("express-validator")

const validarCampos = (req, res = response, next)=>{

    const errors = validationResult(req)
    //console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped().msg,
        })
    }

    //Si no hay errores llamara el next en este caso
    // llamara a lo que sigue despues de los middlewares
    //que es el controlador como tal
    next();
}

module.exports={
    validarCampos
}