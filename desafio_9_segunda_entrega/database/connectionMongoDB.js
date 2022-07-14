const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/ecommerce';

(async ()=>{
    try{

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.once('open', _ =>{  // _ no paso el parametro
            console.log(`Connected to mongo db`);
        });

        mongoose.connection.on('error', err =>{
            console.log(err);
        })

    }catch(err){
        console.log(err);
    }
})();
