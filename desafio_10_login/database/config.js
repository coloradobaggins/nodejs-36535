const mongoose = require('mongoose');

const dbConnection = async () =>{

    try{

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`mongoDB connected`)

    }catch(err){

        console.log(err);
        throw new Error(`Error al iniciar db..`);

    }

}

module.exports = { dbConnection }