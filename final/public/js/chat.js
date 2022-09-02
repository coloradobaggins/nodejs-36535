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

    let theDate = new Date();

    const payload = {
        //date: theDate.toLocaleString(),
        date: theDate,
        email: formMail.value,
        subject: formSubject.value,
        comments: formComments.value
    }

    socket.emit('client-msg', payload, (feedback)=>{
        console.log(`Feedback del server solo para mi: ${feedback}`);  //Feedback solo para este cliente.
    });

    printMsg(payload);

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

    printMsg(payload);

    console.log(payload);

});


const printMsg = (payload)=>{

    msgsContainer.innerHTML += `<div class="mb-3 item-chat">
        <div class="item-header"><p><span class="msg-mail">${payload.email}</span> <span class="msg-date float-end">[ ${payload.date.toLocaleDateString()} - ${payload.date.toLocaleTimeString()} ]</span></p></div>
        <div class="item-body"><p>${payload.comments}</p></div>
    </div>`;

}