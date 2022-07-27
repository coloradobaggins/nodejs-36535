const {fork} = require('child_process')

const getRandoms = (req, res)=>{

    let { cant = 100000000 } = req.query;

    if(cant === undefined || cant === ''){
        cant = 100000000;
    }


    const forked = fork('./utils/bigRandomLoop.js');    //Evita bloqueo de peticiones al server ante tarea pesada.

    forked.on('message', numbers=>{                     //Recibido del hijo (process)

        res.send({
            msg: 'Get randoms!',
            cant: cant,
            numbers
        });

    });

    forked.send({cant});                                //Envio cantidad a subproceso. 

}

module.exports = { getRandoms }