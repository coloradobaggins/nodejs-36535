const { options } = require('../options/mariaDB');
const knex = require('knex')(options);

/**
 * Crea tabla productos (mariaDB)
 */

( async() =>{

    try{

        await knex.schema.dropTableIfExists('productos');

        await knex.schema.createTable('productos', table=>{

            table.increments('id').notNullable();
            table.string('title', 50);
            table.float('price');
            table.string('thumbnail', 250);

        });

    }catch(err){

        console.log(err);

    }finally{

        knex.destroy();
        
    }
    

})();