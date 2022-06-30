console.log(`Hola front!`);

const socket = io();

let statusIndicator = document.querySelector('#server_status');


let msgForm = document.querySelector('#msg-form');
let email   = document.querySelector('#email');
let msgText = document.querySelector('#floatingTextarea');
let btnSend = document.querySelector('#sendMsg');
let msgContainer = document.querySelector('.msgs-container');

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
        <p><span class="msg-mail">${obj.email}</span> <span class="msg-date">${obj.fecha}</span>: <span class="msg-body">${obj.msg}</span></p>
    `;

}