

const prodForm = document.querySelector('#prod-form');
let theProds = [];

const btnDelete = document.querySelectorAll('.btn-delete');
const btnConfirmDelete = document.querySelector('.btn-confirm-delete');
let prodIdToDelete;

const prodEditForm = document.querySelector('#edit-prod-form');
const btnEdit = document.querySelectorAll('.edit-product');
const btnConfirmEdit = document.querySelector('.btn-confirm-edit');
let prodIdToEdit;

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
        category: formData.get('category'),
        thumbnail: formData.get('thumbnail')
    }
    
    const rawResponse = await fetch('/productos/', {
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


});

//Levanta id de producto segun btn clickeado
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

//Borra
const deleteProd = async(prodId)=>{

    console.log(`ok, vamos aborrar el prod ${prodId}`);

    const rawResponse = await fetch('http://localhost:3001/productos/'+prodId, {
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


//Editar
btnEdit.forEach((btn) => {
    
    btn.addEventListener('click', (e)=>{

        prodIdToEdit = e.target.getAttribute('data-prod-id');
        console.log(`prodIdToEdit: ${prodIdToEdit}`);

    });

});


btnConfirmEdit.addEventListener('click', async ()=>{

    console.log(`Confima editar, prodId: ${prodIdToEdit}`);

    let formData = new FormData(prodEditForm);

    const payload = {
        name: formData.get('title'),
        description: formData.get('desc'),
        price: formData.get('price'),
        code: formData.get('code'),
        stock: formData.get('stock'),
        category: formData.get('category'),
        thumbnail: formData.get('thumbnail')
    }
    console.log(`editPayload: `);
    console.log(payload);
    
    const rawResponse = await fetch('/productos/'+prodIdToEdit, {
        method: 'PUT',
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
    

})