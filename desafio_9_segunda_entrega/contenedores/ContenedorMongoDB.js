require('../database/connectionMongoDB');

class ContenedorMongoDB{

    constructor(model){
        this.model = model;
    }

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

        try{

            let updated = await this.model.findOneAndUpdate({_id: id}, objData, {new: true});   //new:true devuelve el ultimo estado del obj modificado, la ultima info actualizada.
            return updated;

        }catch(err){
            console.log(err);
        }

    }

    

    async getById(id){

        try{

            return await this.model.findOne({_id: id});
            
        }catch(err){
            console.log(err);
        }
        
    }

    async deleteById(id){

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