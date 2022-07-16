require('dotenv').config();
//const Server = require('./models/server');
const { Server } = require('./models'); // Lo tomo desde el index..

const server = new Server();

server.listen();