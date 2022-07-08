const socket = io();

let statusIndicator = document.querySelector('#server_status');
let msgForm = document.querySelector('#msg-form');
let email   = document.querySelector('#email');
let msgText = document.querySelector('#floatingTextarea');
let btnSend = document.querySelector('#sendMsg');
let msgContainer = document.querySelector('.msgs-container');

let prodForm = document.querySelector('#prod-form');
let theProds = [];

//Cargar productos al inicio
window.onload = function(){

    socket.emit('get-prods-onload', 'get-prodcuts', (prods)=>{

        theProds = prods;

        console.log(`tenemos los prods??`);
        console.log(theProds);

        createProdTable(theProds);

    });

}

socket.on('connect', ()=>{

    console.log(`Conectado`);

    statusIndicator.innerHTML = "online";
    statusIndicator.className = "text-success";

});

socket.on('disconnect', ()=>{

    console.log(`Desconectado del server`);

    statusIndicator.innerHTML = "offline";
    statusIndicator.className = "text-danger";

});

//Escucha de mensaje del server
socket.on('server-msg', payload=>{

    addMsgElmt(payload);

});

//Envio mensaje
msgForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const msg = msgText.value;
    const mail= email.value;
    

    const payload = {
        email: mail,
        fecha: new Date(Date.now()).toLocaleString(),
        msg: msg
    }

    socket.emit('front-msg', payload, ( received )=>{

        console.log(`Response from server only to me. Received: ${received}`);

    });

    addMsgElmt(payload);

});

//Append de mensaje
const addMsgElmt = (obj)=>{

    msgContainer.innerHTML += `
        <p><span class="msg-mail">${obj.email}</span> <span class="msg-date">[${obj.fecha}]</span>: <span class="msg-body">${obj.msg}</span></p>
    `;

}


//Envio de producto nuevo
prodForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = new FormData(prodForm);

    const payload = {
        title: formData.get('title'),
        price: formData.get('price'),
        thumbnail: formData.get('thumbnail')
    }

    theProds.push(payload);

    socket.emit('add-product', payload, (received)=>{

        console.log(`Response from server only to me. Received: ${received}`);

    })

    createProdTable(theProds);

});

//Respuesta del server ante un producto agregado
socket.on('server-prod-added', payload=>{

    createProdTable(payload);

});

//Template hbs. Levanta e imprime
const createProdTable = async (prod)=>{

    let tableTemplate = await fetch('../partials/tableProd.hbs');
    let textTableTemplate = await tableTemplate.text();

    let template = Handlebars.compile(textTableTemplate);
    let templateRendered = template({prods: prod});

    document.querySelector('.prod-table').innerHTML = templateRendered;

}