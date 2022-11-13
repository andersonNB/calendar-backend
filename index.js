// console.log("Hola mundo cambios")
const express = require('express'); // -> import express from 'express'
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require("./database/config");


//Creando el servidor de express
const app = express();

//Base de datos
dbConnection();


//CORS
app.use(cors())

//Directori Público
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json());


//Rutas
// TODO: auth crear, login, renew
//Todo lo relacionado con la autentificación esta en la ruta de abajo
app.use('/api/auth', require('./routes/auth'))
// TODO: crud: eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`)
})