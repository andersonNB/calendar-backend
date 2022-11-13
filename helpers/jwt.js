const jwt = require('jsonwebtoken');

const generarJWT = (uid,name)=>{

    //Si todo sale bien ->resolve
    //si hay un error ->reject
    return new Promise((resolve,reject)=>{

        const payload = {uid,name};
       
        //Firma del token
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(error,token)=>{
           //Si no se puo generar el token
           //imprimimos el error y utilizamos
           //el reject
            if(error){
                console.log(error)
                reject('No se pudo generar el token')
            }

            //si todo sale bien 
            //resolvemos la promesa
            resolve(token)

        })


    })
    
}


module.exports={
    generarJWT,
}