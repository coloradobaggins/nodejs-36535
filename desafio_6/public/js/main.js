console.log(`Hola front!`);

const socket = io();

let statusIndicator = document.querySelector('#server_status');

let email   = document.querySelector('#email');
let msgText = document.querySelector('#floatingTextarea');
let btnSend = document.querySelector('#sendMsg');

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

socket.on('server-msg', (payload)=>{

    console.log(payload);

})


btnSend.addEventListener('click', ()=>{

    const msg = msgText.value;
    const mail= email.value;

    console.log(msg, mail);
    
    const payload = {
        email: mail,
        msg: msg,
        id: 123,
        fecha: new Date().getTime()
    }

    socket.emit('front-msg', payload);

});