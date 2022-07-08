const {SQLite3Options} = require('../options/SQLite3');
const knex = require('knex')(SQLite3Options);

/**
 * Crea tabla mensajes (SQLite3)
 */

(async ()=>{

    try{

        await knex.schema.dropTableIfExists('mensajes');

        await knex.schema.createTable('mensajes', table=>{

            table.increments('id').notNullable();
            table.string('email', 150);
            table.text('msg');
            table.date('fecha');
        })

    }catch(err){
        console.log(`Error sqlite3`, err);
    }finally{
        knex.destroy();
    }


})();