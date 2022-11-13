//EL proposito de esta función es validar el token
const {response} = require('express')
const jwt = require('jsonwebtoken')


const validarJWT =(req,res=response,next)=>{

    //xtoken headers
    const token = req.header('x-token')
    //console.log(token)

    //Si no viene el token
    if(!token){
        return res.status(401).json({
            ok: false,
            msg:'No hay token en la petición'
        });   
    }

    try {

        const {uid,name} = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        //console.log(payload)
        //podemos modificar la request 
        //agregandole info de la siguiente forma
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        })
    }


    //Si todo sale correcto que llame lo que debe hacer siguiente
    next()

}

module.exports= {
    validarJWT
}