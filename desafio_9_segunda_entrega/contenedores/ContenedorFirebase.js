
var admin = require("firebase-admin");

var serviceAccount = require("../database/firebase_config/coder-node-91958-firebase-adminsdk-j31ey-cd9e7b41b1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


class ContenedorFirebase{

    constructor(collection){

        this.query = db.collection(collection);

        console.log(`Firabase db conectada. Collection ${collection}`);

    }

    async save(obj){

        try{

            let doc = this.query.doc(); //Generacion automatica de id

            await doc.create(obj);

        }catch(err){
            console.log(err);
        }

    }

    async getById(id){

        try{

            

        }catch(err){
            console.log(err);
        }

    }

    async getAll(){

        try{
            
            let items = await this.query.get();
            /*
            items = items.docs.map(doc=>({
                id: doc.id,
                data:doc.data()
            }));
            */
           items = items.docs.map((doc)=>{
                //return {id: doc.id, data:doc.data()}
                return doc.data();
           });

            return items;

        }catch(err){
            console.log(err);
        }

    }

}

module.exports = ContenedorFirebase;