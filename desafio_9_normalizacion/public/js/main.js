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

    
    socket.emit('get-msgs-onload', 'get-msgs', (msgs)=>{


        console.log(msgs);

        renderMsgs(msgs)
        
    });
    

}

const renderMsgs = (theMsgs)=>{

    
    const schemaAuthor = new normalizr.schema.Entity('author');
    const messageSchema = new normalizr.schema.Entity(
            'mensajes',
            {author: schemaAuthor}, 
            {idAttribute: '_id'}
        );
    const allSchema = new normalizr.schema.Entity('all', {
        messages: [messageSchema]
    });

    const denormalizeMsg = normalizr.denormalize(theMsgs.result, allSchema, theMsgs.entities)

    /*
    console.log(`************`);
    console.log(denormalizeMsg);
    console.log(`************`);
    
    console.log(JSON.stringify(theMsgs).length);
    console.log(JSON.stringify(denormalizeMsg).length);
    */
    const avgCompression = Math.floor(100 - (JSON.stringify(theMsgs).length * 100) / JSON.stringify(denormalizeMsg).length);
    console.log(avgCompression);

    printMsgsFromServer(denormalizeMsg);    //Se conecta un socket, recupera todos los mensajes.
 
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


//Escucha de mensajes del server.
socket.on('server-msg', payload=>{

    renderMsgs(payload);

});

//Envio mensaje al back. Armo el objeto. Y al tener los datos del mensajes, llamo a addMsgElmt para agregarlo al body, ya que no es necesario esperar al server.
msgForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = new FormData(msgForm);

    

    const payload = {
        nickname: formData.get('nickname'),
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        age: formData.get('age'),
        email: formData.get('email'),
        msg: formData.get('comments'),
        fecha: new Date(Date.now()).toLocaleString(),
        avatar: formData.get('avatar')

    }


    socket.emit('front-msg', payload, ( received )=>{

        console.log(`Response from server only to me. Received: ${received}`);

    });

    addMsgElmt(payload);
    

});

//Plasma todos los mensajes de la db al conectarse un nuevo socket. Tambien, cuando un socket envia un mensajes, se recibe y plasma aca.
const printMsgsFromServer = (obj)=>{

    console.log(`printMsgsFromServer: `);
    console.log(obj);
    let msgsFromObj = obj.mensajes;

    msgContainer.innerHTML = '';

    const extract = msgsFromObj.map((msg)=>{

        //console.log(msg);

        return msgContainer.innerHTML += `
        <div class="msg-container"><div class="msg-content"><p><span class="msg-mail">${msg.author.id}</span> <span class="msg-date">[${msg.fecha}]</span>: <span class="msg-body">${msg.text}</span></p></div>
        <div class="avatar-container"><img class="img-avatar" src="${msg.author.avatar}" alt="user avatar"></div></div>`;

    })
    

}

//Append de mensaje en local. Solo agrega el ultimo mensaje en este navegador.
const addMsgElmt = (obj)=>{
    
    
    msgContainer.innerHTML += `
        <div class="msg-container"><div class="msg-content"><p><span class="msg-mail">${obj.email}</span> <span class="msg-date">[${obj.fecha}]</span>: <span class="msg-body">${obj.msg}</span></p></div>
        <div class="avatar-container"><img class="img-avatar" src="${obj.avatar}" alt="user avatar"></div></div>`;

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