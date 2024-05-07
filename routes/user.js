const { Router } = require("express");
const { check } = require('express-validator')

 
const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail, existeUsuarioPorId } = require("../helpers/db-validators");

const { usuariosGet, usuariosPut, usuariosPost, userDelete, userPatch } = require("../controllers/user");

const router = Router();

router.get("/", usuariosGet);


router.put("/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);


router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ), 
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPost);

router.delete("/:id",[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], userDelete);

router.patch("/", userPatch);

module.exports = router;
