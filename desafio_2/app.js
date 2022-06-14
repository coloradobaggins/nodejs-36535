let contenedor = require('./Classes/Contenedor');

//Test

let productTest = {
    
    title: 'Mouse',
    price: 4250.99,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/electronics-and-gadget-3/64/MOUSE-devices-electronics-gadget-tools-256.png'
} 

let objContenedor = new contenedor('productos.txt');

/*

console.log(`***`);
console.log(JSON.stringify(productTest));
console.log(`***`); 
objContenedor.save(productTest);

*/

/*
let getAllObjPromise = objContenedor.getAll();
getAllObjPromise.then((res) => console.log(res));

*/
console.log('******');


objContenedor.getById(1);


