const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {
  // const {q,nombre ="No name",apikey} = req.query;

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true}

  // const usuarios = await Usuario.find( query )
  //   .skip(desde)
  //   .limit(limite);

  // const total = await Usuario.countDocuments( query )

  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments( query ),
    Usuario.find( query )
      .skip(desde)
      .limit(limite)
  ])

    res.json({
      total,
      usuarios

    });
  }

  const usuariosPost = async(req, res = response) => {

    // const body = req.body;
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt)

    // Guardar en db
    await usuario.save();

    res.json({
      usuario
    });
  }

  const usuariosPut = async (req, res = response) => { 

    // const id = req.params.id
    const {id} = req.params
    const { _id, password, google, ...resto } = req.body;

    // Validar base de datos
    if(password) {
      const salt = bcryptjs.genSaltSync(10);
      resto.password = bcryptjs.hashSync( password, salt)

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);
   
    res.json(usuario);
  }

  const userDelete = async(req, res = response) => {

    const {id} = req.params
    // !Fisicamente lo borramos Pero no es lo mejor
    // const usuario = await Usuario.findByIdAndDelete( id )

    // ?Cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});




    res.json({
      usuario
    });
  }


  const userPatch = (req, res = response) => {
    res.json({
      msg: "patch API - Controlador",
    });
  }

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    userDelete,
    userPatch
}