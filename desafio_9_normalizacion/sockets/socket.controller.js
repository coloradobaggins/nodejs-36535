const util = require('util');
require('dotenv').config();
const {mariaDBOptions} = require('../options/mariaDB');
const knexMARIA = require('knex')(mariaDBOptions);
const {normalize, schema}   = require('normalizr');

//KNEX + MariaDB
const ContenedorDB = require('../models/ContenedorDB');
const objProdContenedor = new ContenedorDB(knexMARIA, process.env.DB_TABLE);

//MongoDB
const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const objContMongoDB = new ContenedorMongoDB();



// *** Normalizr ***
//Esquemas
const schemaAuthor = new schema.Entity('author');

const messageSchema = new schema.Entity(
        'mensajes',
        {author: schemaAuthor}, 
        {idAttribute: '_id'}
    );

const allSchema = new schema.Entity('all', {
    messages: [messageSchema]
});

//Normaliza msg
const normAndFormtatMsgs = (allMsgsDb)=>{


    return normalizedData = normalize(
        {
            id: 'mensajes',
            mensajes: allMsgsDb
        }, 
        allSchema
    );

}

const socketController = async(socket)=>{

    console.log(`socket (client) connected (${socket.id})`);


    socket.on('disconnect', ()=>{
        console.log(`** socket DISconnected (${socket.id}) **`);
    });

    //Cuando se conecta un nuevo cliente, envia este event y buscamos todos los mensajes para entregarselos
    socket.on('get-msgs-onload', async(payload, callback)=>{

        try{

            let allMsgsDb = await objContMongoDB.getAll();

            const normalizedData = normAndFormtatMsgs(allMsgsDb)

            callback(normalizedData);

        }catch(err){
            console.log(err);
        }

    }); 

    //Recibe del front
    socket.on('front-msg', async (payload, callback)=>{           //Callback opcional
        

        const received = true;                                     //Por ej.: Enviar cuando ya grabe en mi modelo..
        
        callback(received);

        try{

            //Guardo los datos que llegan del front, el msg
            await objContMongoDB.save({

                author: {
                        id: payload.email,
                        nombre: payload.name,
                        apellido: payload.lastname,
                        edad: payload.age,
                        alias: payload.nickname,
                        avatar: payload.avatar
                    },
                fecha: payload.fecha,
                text: payload.msg

            });

            let msgs = await objContMongoDB.getAll()

            const normalizedData = normAndFormtatMsgs(msgs)

            socket.broadcast.emit('server-msg', normalizedData);       


        }catch(err){
            console.log(err);
        }


    });

    
    //Obtener productos cuando se conecta un socket.
    socket.on('get-prods-onload', async(payload, callback)=>{

        try{

            let prods = await objProdContenedor.getAll();

            callback(prods);

        }catch(err){

            console.log(err);

        }

    });

    //Agregar producto
    socket.on('add-product', async(payload, callback)=>{

        try{

            await objProdContenedor.save(payload);

            const allProds = await objProdContenedor.getAll();

            socket.broadcast.emit('server-prod-added', allProds);

            const received = true;
            callback(received);

        }catch(err){

            console.log(err);

        }

    });

}

//Print normalizr
function print(objeto){
    //console.log(util.inspect(normalizedEmpresa, {depth: null}));
    console.log(util.inspect(objeto,false,12,true))
}

module.exports = socketController;