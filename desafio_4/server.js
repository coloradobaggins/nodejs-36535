const express = require('express');
const app = express();  //Express app
const port = 8080;

//Call a the required packages
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//Routes
app.get('/', (req, res)=>{

    res.sendFile('index.html');

});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})