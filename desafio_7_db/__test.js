require('dotenv').config();
const {mariaDBOptions} = require('./options/mariaDB');
const {SQLite3Options} = require('./options/SQLite3');
const knex = require('knex')(mariaDBOptions);
//const knex = require('knex')(SQLite3Options);
const Contenedor = require('./models/ContenedorDB');

//const objContenedorDb = new Contenedor(knex, 'mensajes');
const objContenedorDb = new Contenedor(knex, 'productos');



/**
 * TESTS MARIADB, SQLITE3 operaciones
 */
async function test(){

    let testProd = {
        title: 'update!!',
        price: 5762.45,
        thumbnail: ''
    }

    try{
        
        
        let all = await objContenedorDb.getAll();
        console.log(all);
        
        
        /*
        let findById = await objContenedorDb.getById(1);
        console.log(findById);
        */

        /*
        let inserted =  await objContenedorDb.save(testProd);
        console.log(inserted);
        */

        /*
        let deleted = await objContenedorDb.deleteById(2);
        console.log(deleted);
        */
/*
        let allDeleted = await objContenedorDb.deleteAll();
        console.log(allDeleted);
        */

        /*
        let update = await objContenedorDb.update(1, testProd);
        console.log(update);
        */
        
    }catch(err){
        console.log(err);
    }

}

test();