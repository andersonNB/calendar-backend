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
app.use('/api/events', require('./routes/events'))

//Por si llega alguna ruta que no sean las especificadas anteriormente
//este index.html es el index que creamos ene l bluid del front
app.get('*',(req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`)
})