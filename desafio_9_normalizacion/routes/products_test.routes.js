const { Router } = require('express');
const { faker } = require('@faker-js/faker');

const router = Router();

const getProductsRandomData = (totalItems)=>{

    totalItems = parseInt(totalItems);

    let productos = [];

    for(let i=0; i<totalItems; i++){

        let pName = faker.commerce.product()

        let product = {

            //nombre: faker.commerce.productName(),
            nombre: pName,
            precio: faker.commerce.price(1000, 8000, 2, '$'),
            foto: faker.image.imageUrl(640, 480, pName, true)

        }

        productos.push(product);

    }

    return productos;

}

router.get('/', (req, res)=>{

    let randomProds = getProductsRandomData(5);
    
    //res.send(randomProducts);

    res.render('randomProducts', {randomProds});

})

module.exports = router;