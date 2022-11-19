/* Rutas de usuarios / Auth
  host +/api/auth
*/
//1er forma 
//const express = require('express')
//const router = express.Router
//Seg forma
const { Router } = require('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();


router.post('/new',
  [//middlewares
    check('name', 'EL nombre es obligatorio').not().isEmpty(),
    check('email', 'EL email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    //Esta funcion es la encargada de recoger los resultados de los checks de arriba
    validarCampos
  ],
  crearUsuario)

router.post('/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router;