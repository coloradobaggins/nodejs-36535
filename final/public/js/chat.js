//Messages socket
console.log(`messages sockets`);
const socket = io();

const serverOnline  = document.querySelector('.server-online');
const serverOffline = document.querySelector('.server-offline');

const formMail      = document.querySelector('#mail');
const formSubject   = document.querySelector('#subject');
const formComments  = document.querySelector('#comments');
const sendMsgBtn    = document.querySelector('#send-msg');

let msgsContainer  = document.querySelector('.msgs-container'); 

sendMsgBtn.addEventListener('click', ()=>{

    console.log(`To send: `);

    const payload = {
        mail: formMail.value,
        subject: formSubject.value,
        comments: formComments.value
    }

    socket.emit('client-msg', payload, (feedback)=>{
        console.log(`Feedback del server solo para mi: ${feedback}`);  //Feedback solo para este cliente.
    });

});

socket.on('connect', ()=>{


    console.log(`conectado`);

    serverOffline.style.display = 'none';
    serverOnline.style.display = 'block';

});

socket.on('disconnect', ()=>{


    console.log(`Desconectado del servidor`);

    serverOffline.style.display = 'block';
    serverOnline.style.display = 'none';

});


socket.on('server-msg', (payload)=>{

    //console.log(`Este mensaje llega desde el server!`);

    msgsContainer.innerHTML += `<div class="mb-3 item-chat">
        <div class="item-header"><p><span class="msg-mail">${payload.mail}</span> <span class="msg-date float-end">[ 2022-08-29 20:27:00 ]</span></p></div>
        <div class="item-body"><p>${payload.comments}</p></div>
    </div>`;

    console.log(payload);

});