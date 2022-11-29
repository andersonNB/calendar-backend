const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const {generarJWT} = require('../helpers/jwt')
//const { validationResult } = require('express-validator')

const crearUsuario = async(req, res = express.response) => {
    const { email, password } = req.body

    try {
       //Validaciones con el email
       let usuario = await Usuario.findOne({email: email})

       //console.log(usuario)
       if(usuario){
        return res.status(400).json({
            ok:false,
            msg:'Un usuario existe con ese correo'
        })
       }
        usuario = new Usuario(req.body)

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password,salt)

        //Guarde el usuario en la bd
        await usuario.save();

        //Generar JWT cuando se crea un usuario
        const token =await generarJWT(usuario.id,usuario.name)
        res.status(201).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name,
            token,
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg:'Por favor hable con el administrador',
        })
    }
    //Se cambio por el express validator
    // if (name.length < 5) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: "El nombre debe ser de 5 letras"
    //     })
    // }

    //manejo de errores
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped(),
    //     })
    // }
}

const loginUsuario = async(req, res = express.response) => {
    
    const { email, password } = req.body

    try {
        //Validaciones con el email
       const usuario = await Usuario.findOne({email: email}) //-> trae la info de la bd

       //console.log(usuario)
       if(!usuario){
        return res.status(400).json({
            ok:false,
            msg:'El usuario no existe con ese email'
        })
       }

       //Confirmar las contraseñas
       const validPassword = bcrypt.compareSync(password, usuario.password);

       if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg: 'Password incorrecto'
        })
       }

       
       //SI sale todo bien en este punto generaremos un JWT
       const token =await generarJWT(usuario.id,usuario.name)

       res.json({
        ok:true,
        uid:usuario.id,
        name:usuario.name,
        token,
       })
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Por fabor hable con el administrador'
        })
    }

    // res.status(201).json({
    //     ok: true,
    //     msg: 'login',
    //     email,
    //     password
    // })
}


const revalidarToken = async(req, res = express.response) => {
    // console.log(req) -> aquí vienen los headers y el body

    const uid = req.uid
    const name = req.name

    //Generamos el token
    const token = await generarJWT(uid,name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}