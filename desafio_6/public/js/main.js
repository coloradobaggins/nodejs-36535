console.log(`Hola front!`);

const socket = io();

let statusIndicator = document.querySelector('#server_status');


let msgForm = document.querySelector('#msg-form');
let email   = document.querySelector('#email');
let msgText = document.querySelector('#floatingTextarea');
let btnSend = document.querySelector('#sendMsg');
let msgContainer = document.querySelector('.msgs-container');

let prodForm = document.querySelector('#prod-form');

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

socket.on('server-msg', payload=>{

    addMsgElmt(payload);

});


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

const addMsgElmt = (obj)=>{

    msgContainer.innerHTML += `
        <p><span class="msg-mail">${obj.email}</span> <span class="msg-date">[${obj.fecha}]</span>: <span class="msg-body">${obj.msg}</span></p>
    `;

}

window.onload = function(){
    
    socket.emit('get-prods-onload', 'get-prodcuts', (prods)=>{

        console.log(`tenemos los prods??`);
        console.log(prods);

    });

}

prodForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = new FormData(prodForm);

    const payload = {

        title: formData.get('title'),
        price: formData.get('price'),
        thumbnail: formData.get('thumbnail')

    }

    console.log(payload);

    socket.emit('add-product', payload, (received)=>{

        console.log(`Response from server only to me. Received: ${received}`);

    })

});

socket.on('server-prod-added', payload=>{

    console.log(`Recibimos.....`);
    console.log(payload);


});