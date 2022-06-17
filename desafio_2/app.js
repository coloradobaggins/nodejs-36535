let contenedor = require('./Classes/Contenedor');


let productTest = {
    
    title: 'Set de lapices 2 ',
    price: 154.50,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/electronics-and-gadget-3/64/MOUSE-devices-electronics-gadget-tools-256.png'
} 

let objContenedor = new contenedor('productos.txt');

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
 *  Get by Id
 *  ** OK **
 */
/*
objContenedor.getById(2)
.then((res)=> console.log(res))
.catch((err)=> console.log(err));
*/

/**************
 *  Get All
 * ** OK **
 */

objContenedor.getAll()
.then((res) => console.log(res))
.catch((err)=> {console.log(err)});


/**************
 *  Delete by Id
 *  ** OK **
 */
/*
objContenedor.deleteById(4)
.then((res) => console.log(res))
.catch((err)=> console.log(err));
*/

/**************
 *  Delete all
 *  ** OK **
 */
/*
objContenedor.deleteAll()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});
*/
