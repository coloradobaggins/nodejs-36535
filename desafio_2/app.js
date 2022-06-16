const { send } = require('process');
let contenedor = require('./Classes/Contenedor');

//Test

let productTest = {
    
    title: 'teclado',
    price: 4222.99,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/electronics-and-gadget-3/64/MOUSE-devices-electronics-gadget-tools-256.png'
} 

let objContenedor = new contenedor('productos.txt');



/**************
 *  Get by Id
 *  ** OK **
 */
/*
objContenedor.getById(2)
.then((res)=> console.log(res))
.catch((err)=> console.log(err));
*/

/**************
 *  Delete by Id
 *  ** OK **
 */
objContenedor.deleteById(2)
.then((res) => console.log(res))
.catch((err)=> console.log(err));

/**************
 *  Save
 * ** OK **
 */
/*
objContenedor.save(productTest)
.then((res) => console.log(res))
.catch((err) => console.log(err))
*/

/**************
 *  Get All
 * ** OK **
 */
/*
let getAllObjPromise = objContenedor.getAll();
getAllObjPromise.then((res) => console.log(res));

*/

/**************
 *  Delete all
 *  ** OK **
 */
/*
objContenedor.deleteAll()
.then((res)=>{
    console.log(`Enviando a borrar..`);
    console.log(res);
})
.catch((err)=>{

    console.log(err);

});
*/
