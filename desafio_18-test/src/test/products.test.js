const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

//Assertion Style
chai.should();

chai.use(chaiHttp);

const SERVER_URL = 'http://localhost:8080';

let prodId = 0;
let cantProds = 0;


/**
 * Test GET route
 */
describe('GET products/', () => {

    it('Deberia obtener array de todos los productos ', (done) => {


        //chai.request(app)                         //*** Me da error app.address is not a function ****/
        chai.request(SERVER_URL)
            .get('/products')
            .end((err, response)=>{

                response.should.have.status(200);
                response.body.should.be.a('array');
                cantProds = response.body.length;

                done();

            })
    })

    it('No deberia obtener productos, url erronea', (done)=>{
        chai.request(SERVER_URL)
        .get('/productoos')
        .end((err, response)=>{

            response.should.have.status(404);

            done();
        });
    })
});

/**
 * Test POST route
 */
describe('POST - Insertar nuevo producto', () => {

    it('Deberia agregar un nuevo producto', (done) =>{

        let testProd = {
            name: "PELOTA",
            description: "DE FUTBOL",
            code: 12,
            price: 23,
            stock: 4,
            thumbnail: ""
        }

        chai.request(SERVER_URL)
            .post('/products')
            .send(testProd)
            .end((err, response) => {

                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('msg');
                
                prodId = response.body.msg._id;
                cantProds++;

                done();
            }); 

    });
    
    it('Deberia haber incrementado en uno el largo del array de productos', (done) => {

        chai.request(SERVER_URL)
            .get('/products')
            .end((err, response) => {
                
                response.should.have.status(200);
                assert.strictEqual(response.body.length, cantProds);

                done();
            });

    });

});


/**
 * Test UPDATE route
 */
describe('UPDATE - Actualiza un producto', () => {

    let testProdUpdated = {
        name: "PELOTA ACTUALIZADA",
        description: "DE BASQUET",
        price: 45,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-flat-2/48/Basketball-256.png"
    }

    it('Deberia actualizar datos de un producto por su id', (done) => {

        chai.request(SERVER_URL)
            .put('/products/'+prodId)
            .send(testProdUpdated)
            .end((err, response) => {

                response.should.have.status(200);
                response.should.be.a('object');
                response.body.should.have.property("result");
                assert.strictEqual(response.body.result.name, testProdUpdated.name);
                assert.strictEqual(response.body.result.description, testProdUpdated.description);
                assert.strictEqual(response.body.result.price, testProdUpdated.price);
                assert.strictEqual(response.body.result.thumbnail, testProdUpdated.thumbnail);

                done();
            });
            
    });

    
    it('No deberia actualizar sin ID de producto', (done)=>{

        chai.request(SERVER_URL)
            .put('/products/')
            .send(testProdUpdated)
            .end((err, response) => {

                response.should.have.status(404);
                response.should.be.a('object');
                

                done();
            });

    })

});

/**
 * Test DELETE route
 */
describe('DELETE - Elimina producto', ()=>{

    it('Debe eliminar un producto por su id', (done) => {

        chai.request(SERVER_URL)
            .delete('/products/'+prodId)
            .end((err, response) => {

                response.should.have.status(200);
                response.body.should.have.property("deleted");
                
                cantProds--;
                
                done();
            });
            
    });

    it('Debe comprobar que el largo del array se haya disminuido en uno', (done)=>{

        chai.request(SERVER_URL)
            .get('/products')
            .end((err, response) => {

                response.should.have.status(200);
                assert.strictEqual(response.body.length, cantProds);

                done();
            })

    })

});