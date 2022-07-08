class ContenedorDB{

    constructor(knex, table){

        this.knex = knex;
        this.table = table;

    }

    /**
     * 
     * @param {*} obj 
     * @returns last id 
     */
    async save(obj){
        
        try{

            return await this.knex(this.table).insert(obj);

        }catch(err){ 

            console.log(`Error al insertar nuevo dato`);
            console.log(err);

        }   

    }

    /**
     * 
     * @param {int} id 
     * @returns obj || null
     */
    async getById(id){

        try{

            return await this.knex(this.table).where('id', id);

        }catch(err){

            console.log(err);
        }
        
    }

    /**
     * 
     * @returns Array [] - vacio si no encuentra datos.
     */
    async getAll(){

        try{

            return await this.knex.select('*').from(this.table);

        }catch(err){

            console.log(`Error al obtener datos de tabla ${this.table}, error: ${err}`);

        }
        
    }

    /**
     * (void)
     * @param {int} id 
     */
    async deleteById(id){

        try{

            return await this.knex(this.table).where('id', id).del();

        }catch(err){

            console.log(err);
        }

    }

    /**
     * (void)
     * @returns 1 si borra, [] si no borra
     */
    async deleteAll(){

        try{

            return await this.knex(this.table).del();

        }catch(err){

            console.log(err)

        }

    }

    /**
     * 
     * @param {int} id 
     * @param {obj} obj 
     * @returns 1 -> ok update | 0 no update
     */
    async update(id, obj){

        try{

            return await this.knex(this.table).where('id', id).update(obj);

        }catch(err){
            console.log(err);
        }

    }

}

module.exports = ContenedorDB;