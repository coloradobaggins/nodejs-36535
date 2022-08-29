//Messages socket
console.log(`messages sockets`);
const socket = io();

const serverOnline  = document.querySelector('.server-online');
const serverOffline = document.querySelector('.server-offline');

const formName      = document.querySelector('#nombre');
const formComments  = document.querySelector('#comments');
const sendMsgBtn    = document.querySelector('#send-msg');

sendMsgBtn.addEventListener('click', ()=>{

    console.log(`To send: `);

    const payload = {
        name: formName.value,
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

    console.log(payload);

});