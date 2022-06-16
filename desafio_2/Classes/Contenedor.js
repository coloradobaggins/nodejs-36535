const fs = require('fs');
const { parse } = require('path');
const { json } = require('stream/consumers');

module.exports = class Contenedor{

    constructor(fileName){

        this.fileName = fileName;

    }

    /**
     * 
     * Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
     * Incorporara al producto un id numerico, que debera ser siempre uno mas que el id del ultimo
     * objeto agregado (o id 1 si es el primer objeto que se agrega)
     * NO pUEDE ESTAR REPETIDO. Tomar siempre el id del anterior..
     * 
     * @param {obj} obj 
     */
    async save(obj){        
        
        if(await this.__checkFileEmpty()){
            this.__writeFile();                                                         //Si esta completamente vacio, que le ponga los [] - Evito error de json.
        }
        
        let allProducts = [];
        let jsonData = await this.getAll();

        let lastAssignedId = 0;

        
        if(jsonData.length > 0){                                                        //BUscar el id mas alto, y recuper los objetos

            lastAssignedId = Math.max(...jsonData.map((products)=> products.id));

            jsonData.map((p)=>{

                allProducts.push(p);
                
            });

            console.log(`lastAssignedId: ${lastAssignedId}`);

        }

        obj.id = lastAssignedId + 1;

        allProducts.push(obj);

        console.log(`all productos:`);
        console.log(allProducts);

        
        

        //return jsonData;
        //return readedFile;

            
        try{

            //await fs.promises.writeFile(this.fileName, JSON.stringify(allProducts, null, 2)); 

            this.__writeFile(JSON.stringify(allProducts, null, 2));

            console.log('se agrego texto al archivo');

        }catch(err){

            console.log(`Se produjo un error..`);
            console.log(err);

        }

        

        
        

        //return id asignado
    }

 

    /**
     * 
     * @param {int} id 
     * @returns obj || null
     */
    async getById(id){

        let fileData = await this.getAll();

        return fileData.find((p)=> p.id===id) ?? null;
    
    }

    /**
     * 
     * @param {int} id 
     * @returns 
     */
    async deleteById(id){

        let theFile = await this.getAll();

        let filteredObj = theFile.filter((p)=>p.id !==id);

        this.__writeFile(JSON.stringify(filteredObj, null, 2));

    }

    /**
     * 
     * TODO:: chequear si es un obj, si tengo [] o si esta vacio?
     * 
     * @returns json object
     */
    async getAll(){

        try{

            let readedFile = await this.__readFile();
            
            let jsonData = await JSON.parse(readedFile);

            return jsonData;

        }catch(err){

            console.log(`getAll() ...Error al obtener todos...`);
            console.log(err);

        }

    }

    /**
     * Eliminar todos los objetos presentes en el archivo.
     */
    async deleteAll(){

        try{

            this.__writeFile();

            return true;

        }catch(err){

            console.log(`Error al leer/escribir archivo`);
            console.log(err);

        }

    }



    async __readFile(){

        try{

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            return fileData;

        }catch(err){

            console.log('Error al leer archivo');
            console.log(err);

        }

    }

    async __checkFileEmpty(){

        let theFile = await this.__readFile();

        
            if (theFile.length === 0) {
                //Code to be executed if the file is empty

               return true;

            }
        return false;
    }

    async __writeFile(objToWrite = []){

        let writeInFile = (objToWrite.length===0) ? '[]' : objToWrite;

        try{

            await fs.promises.writeFile(this.fileName, writeInFile)

        }catch(err){
            console.log(err);
        }

    }

}