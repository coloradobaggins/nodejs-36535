//************************ */
//SHOP CODE
//************************ */
console.log('shop.js')

const addToCartBtn = document.querySelectorAll('.add-to-cart');

addToCartBtn.forEach((elmt)=>{

    elmt.addEventListener('click', addProdToCart);

});

async function addProdToCart(e){

    console.log('addProdToCart');

    let productId = e.target.getAttribute('data-prod-id');

    console.log(productId);

    const rawResponse = await fetch('http://localhost:3001/api/carrito/',{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: productId})
    })

    const content = await rawResponse.json();
    console.log(content);

    if(content.status === 'redirect'){
        location.href = content.url;
    }

}
