const { Router } = require('express')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events")
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()

/* Rutas Event
  host +/api/events
*/

//todas las rutas tienen que pasar por la validación del JWT
// como todas las rutas debe tener su token eso lo podemos 
// mejorar de la siguiente manera para no tener que colocar
// la función validarJWT en cada ruta, ¡OJO! todas las rutas 
// que esten debajo de router.use(validarJWT), si hay un ruta
// por encima de esta, no tendra la validación de token
router.use(validarJWT)

//obtener eventos
router.get('/',  getEventos)

//Crear un nuevo evento
router.post('/', crearEvento)

//Actualizar evento
router.put('/:id', actualizarEvento)


//Borrar evento
router.delete('/:id', eliminarEvento)

//Exportando por defecto
module.exports = router;