

let prodForm = document.querySelector('#prod-form');
let theProds = [];

let btnDelete = document.querySelectorAll('.btn-delete');
let btnConfirmDelete = document.querySelector('.btn-confirm-delete');
let prodIdToDelete;

window.onload = function(){

    console.log(`products.js`);

}


//Envio de producto nuevo
prodForm.addEventListener('submit', async (e)=>{

    console.log('llego aca?')

    e.preventDefault();

    let formData = new FormData(prodForm);

    const payload = {
        name: formData.get('title'),
        description: formData.get('desc'),
        price: formData.get('price'),
        code: formData.get('code'),
        stock: formData.get('stock'),
        thumbnail: formData.get('thumbnail')
    }

    //console.log(payload);
    
    const rawResponse = await fetch('/api/productos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload),
        
    });

    const jsonResponse = await rawResponse.json();

    console.log(jsonResponse);

    if(jsonResponse.status === 'success'){
        location.reload();
    }

    //e.target.reset();   //Clear all fields

});

btnDelete.forEach((btn)=>{

    btn.addEventListener('click', (e)=>{

        prodIdToDelete = e.target.getAttribute('data-prod-id')

        console.log(`clicked ${prodIdToDelete}`);
    })

})

btnConfirmDelete.addEventListener('click', ()=>{

    console.log(`ELIMINAR! ${prodIdToDelete}`);


    deleteProd(prodIdToDelete);


})


const deleteProd = async(prodId)=>{

    console.log(`ok, vamos aborrar el prod ${prodId}`);

    const rawResponse = await fetch('http://localhost:3001/api/productos/'+prodId, {
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);

    if(jsonResponse.status === 'success'){
        location.reload();
    }

}