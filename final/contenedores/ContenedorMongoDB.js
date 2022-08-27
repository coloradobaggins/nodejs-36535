const mongoose = require('mongoose');
require('../database/config');

class ContenedorMongoDB{

    constructor(model){
        this.model = model;
    }

    /**
     * Recibe json vacio ( {} ), json con array prodcutos (con o sin prods.)
     * Si envio el [] productos, deben ser ObjectId, definido por el modelo.
     * 
     * 
     * @param {obj} objData 
     * @returns 
     */
    async save(objData){

        try{

            let added = await this.model.create(objData);
            console.log(added);
            return added;

        }catch(err){
            console.log(err);
        }
    }

    async update(id, objData){

        if(!mongoose.isValidObjectId(id)){

            return `invalid (ObjectId)`;

        }

        try{

            let updated = await this.model.findOneAndUpdate({_id: id}, objData, {new: true});   //new:true devuelve el ultimo estado del obj modificado, la ultima info actualizada.
            return updated;

        }catch(err){
            console.log(err);
        }

    }

    

    async getById(id){

        if(!mongoose.isValidObjectId(id)){

            return `invalid (ObjectId)`;

        }

        try{
             
            return await this.model.findOne({_id: id});

            /**************** */
            //TODO:: se movio a ProductMongoDB.js
            //return await this.model.findOne({_id: id}).populate('productos');
            /**************** */

        }catch(err){
            console.log(err);
        }
        
    }

    async deleteById(id){

        if(!mongoose.isValidObjectId(id)){

            return `invalid (ObjectId)`;

        }

        try{

            let deleted = await this.model.findOneAndDelete({_id: id});

            return deleted;

        }catch(err){
            console.log(err);
        }

    }

    async getAll(){
        try{
            return await this.model.find();
        }catch(err){
            console.log(err);
        }
        

    }


}

module.exports = ContenedorMongoDB;