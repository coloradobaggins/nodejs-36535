const express = require('express');
const app = express();  //Express app
const port = 8080;

//Call a the required packages
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));  //Servir contenido estatico.ß

//Routes
app.get('/', (req, res)=>{

    res.sendFile('index.html');

});

app.get('/api/productos', (req, res)=>{

    res.send(`Devolver todos los productos...`);

});

app.get('/api/productos/:id', (req, res)=>{

    let id = req.params.id;

    res.send(`Devuelve un producto segun su id.. id: ${id}`);

});

app.post('/api/productos', (req, res)=>{

    res.send(`Recibe y agrega un producto. Lo devuelve con su id asignado.`);

});

app.put('api/productos/:id', (req, res)=>{
    
    let id = req.params.id;

    res.send(`Recibe y actualiza un producto - id: ${id}`);

});

app.delete('api/productos/:id', (req, res)=>{

    res.send(`Eliminar un producto segun su id`)

});

//404
app.get('*', (req, res)=>{

    res.sendFile(__dirname + '/public/404.html');

})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})