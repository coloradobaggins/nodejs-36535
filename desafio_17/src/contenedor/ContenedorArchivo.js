const fs = require('fs');

module.exports = class ContenedorArchivo{

    constructor(fileName){
        
        if(fileName == "" || fileName == undefined){
            console.error("** Especificar nombre de archivo **");
        }
        this.fileName = fileName;

    }

    /**
     * 
     * Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
     * Incrementa id
     * 
     * @param {obj} obj 
     */
    async save(obj){    
        
        if(await this.__checkFileEmpty()){
            this.__writeFile();                                                         //Si esta completamente vacio, escribo los [] - Evito error de json.
        }
        
        let allProducts = [];
        let jsonData = await this.getAll();

        let lastAssignedId = 0;

        
        if(jsonData.length > 0){                                                        //Si tengo objetos, buscar el id mas alto. Recupero los objetos

            lastAssignedId = Math.max(...jsonData.map((products)=> products.id));

            jsonData.map((p)=>{

                allProducts.push(p);
                
            });

        }

        lastAssignedId++;

        obj.id = lastAssignedId;

        allProducts.push(obj);
            
        try{

            this.__writeFile(JSON.stringify(allProducts, null, 2));

            return lastAssignedId;

        }catch(err){

            console.log(`Se produjo un error..`);
            console.log(err);

        }

    }

    async update(id, objForUpdate){

        if(isNaN(id))
            throw `id tiene que ser un numero`;

        //Check si tenemos ese item
        let hasItem= await this.getById(id);
        

        if(hasItem !== null){   //El producto existe

            console.log(`el item existe.. update!`);

            //Traeer todos items
            let allItems = await this.getAll();

            let itemFoundIndex = allItems.findIndex((item)=>item.id == id);

            console.log(`index found in array: ${itemFoundIndex}`);

            allItems[itemFoundIndex] = objForUpdate;

            await this.__writeFile(JSON.stringify(allItems, null, 2));


        }else{
            throw `No existe item con el id buscado: ${id}`;
        }

    }

    /**
     * 
     * @param {int} id 
     * @returns obj || null
     */
    async getById(id){
        
        let parsedId = parseInt(id);

        if(!isNaN(parsedId)){
            try{

                let fileData = await this.getAll();
    
                return fileData.find((p)=> p.id===parsedId) ?? null;
    
            }catch(err){
                console.log(err);
            }
        }else{

            throw `getById error: id isNaN`;
        }
        
    }

    /**
     * Si existe el producto by id, intenta borrar.
     * Filtra por id en el total de items del archivo.txt.
     * Se obtienen todos los items menos el buscado por id.
     * El objeto se manda a escribir.
     * @param {int} id 
     * @returns 
     */
    async deleteById(id){

        let parsedId = parseInt(id);

        console.log(`delete id: ${id}`);

        if(await this.getById(parsedId)==null)    //Check product id antes de borrar, si existe.
            return null;
        
        try{

            let theFile = await this.getAll();

            let filteredObj = theFile.filter((p)=>p.id !==parsedId);

            this.__writeFile(JSON.stringify(filteredObj, null, 2));

            return true;

        }catch(err){
            
            throw `deleteById error ${err}`;

        }
        
    }

    /**
     * 
     * @returns json object
     */
    async getAll(){

        try{

            let readedFile = await this.__readFile();
            
            let jsonData = await JSON.parse(readedFile);

            return jsonData;

        }catch(err){

            throw `Error getAll: ${err}`;

        }

    }

    /**
     * 
     * 
     */
    async deleteAll(){

        try{

            this.__writeFile();

        }catch(err){

            throw `Error al leer/escribir archivo ${err}`;

        }

    }


    async __readFile(){

        try{

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            return fileData;

        }catch(err){

            throw `Error al leer archivo ${err}`;

        }

    }

    /**
     * 
     * @returns {bool}
     */
    async __checkFileEmpty(){

        let theFile = await this.__readFile();

        
            if (theFile.length === 0) {

               return true;

            }
        return false;
    }

    /**
     * 
     * @param {json} objToWrite 
     */
    async __writeFile(objToWrite = []){

        let writeInFile = (objToWrite.length===0) ? '[]' : objToWrite;

        try{

            await fs.promises.writeFile(this.fileName, writeInFile)

        }catch(err){

            throw `Error al escribir archivo ${err}`;

        }

    }

}