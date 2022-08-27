

let prodForm = document.querySelector('#prod-form');
let theProds = [];

window.onload = function(){

    console.log(`on load`)

}


//Envio de producto nuevo
prodForm.addEventListener('submit', (e)=>{

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

    console.log(payload);

    fetch('/api/productos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload),
        
    })
    .then(()=>{
        //location.reload();
    });

    e.target.reset();   //Clear all fields

});

