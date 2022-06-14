const fs = require('fs');
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

        console.log(`test from contenedor save()`);

        console.log(obj.id);

        

        //Leer el archivo...
        let fileReaded = await this.readTheFile();

        console.log(fileReaded);
        
        /*
        try{

            await fs.promises.appendFile(this.fileName, '['+JSON.stringify(obj, null, 2)+']');
            console.log('se agrego texto al archivo');

        }catch(err){
            console.log(`Se produjo un error..`);
            console.log(err);
        }
        */

        //return id asignado
    }


    async readTheFile(){

        console.log('** reading file... **');

        let parsedData;

        try{

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            
            

            parsedData =  JSON.parse(fileData);

            return parsedData;
            //console.log(parsedData);
            //console.log(parsedData.length);


        }catch(err){

            console.log('Error al leer archivo');
            console.log(err);

        }

    }

    getById(id){

        console.log(id);

        let fileData = this.getAll();

        let allData;

        let filteredObj = [];

        fileData.then((res)=> {

            allData = res;

            filteredObj = allData.find((elmt) => elmt.id == id);

            //console.log(filteredObj);

            if(filteredObj==undefined){
                throw ('No tenemos nada para devolver con ese id...');
            }


        });

        
    
    }

    async getAll(){

        try{

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            let jsonData = JSON.parse(fileData);

            return jsonData;

        }catch(err){

            console.log('Error al leer archivo');
            console.log(err);

        }

    }


}