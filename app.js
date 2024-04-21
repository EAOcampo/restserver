require('dotenv').config()
const Server = require('./models/server')


//! Llamar la clase del servidor
const server = new Server();


server.listen()