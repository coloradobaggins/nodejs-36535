console.log(`cart.js`);

const removeFromCartBtn = document.querySelectorAll('.remove-from-cart');

removeFromCartBtn.forEach((elmt)=> {

    elmt.addEventListener('click', removeFromCart);

})

async function removeFromCart(e){

    let productId = e.target.getAttribute('data-prod-id');

    console.log(`Remove item from cart, ittem id: ${productId}`);

    
    const rawResponse = await fetch(`http://localhost:3001/carrito/${productId}/producto`, {
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({_id: productId})
    });

    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);

    if(jsonResponse.status === 'ok'){
        
        location.reload();
    }

}