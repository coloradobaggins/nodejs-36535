require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

//Assertion Style
chai.should();

chai.use(chaiHttp);

const SERVER_URL = 'http://localhost:3001';

let cantProds = 0;

let testProd = {
    name: "PELOTA",
    description: "DE FUTBOL",
    code: 12,
    price: 23,
    stock: 4,
    thumbnail: ""
}


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


describe('POST products', () => {

    it('Deberia agregar un nuevo producto', () =>{

        chai.request(SERVER_URL)
            .post('/products')
            .end((err, response) => {

                

            }); 

    }); 

});
