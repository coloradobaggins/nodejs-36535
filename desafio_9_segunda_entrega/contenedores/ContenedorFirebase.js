
var admin = require("firebase-admin");

var serviceAccount = require("../database/firebase_config/archivo-credenciales-node-ecommerce-firebase.json");

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

            let doc = this.query.doc(id);
            let item = await doc.get();
            let docData = item.data();
            docData.id = item.id;
            return docData;

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
                let theData = doc.data();
                theData.id = doc.id;
                return theData;
           });

            return items;

        }catch(err){
            console.log(err);
        }

    }

    async deleteById(id){

        try{

           let theDoc = this.query.doc(id);
           let item = await theDoc.delete();
           return item;

        }catch(err){
            console.log(err);
        }

    }

    async update(id, obj){

        try{
            let theDoc = this.query.doc(id);
            let item = await theDoc.update(obj);
            return 'updated';
            
        }catch(err){
            console.log(err);
        }

    }

}

module.exports = ContenedorFirebase;