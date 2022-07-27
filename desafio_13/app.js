const cluster = require('cluster');
const numCpus = require('os').cpus().length;
require('dotenv').config();
const Server = require('./models/server');
const yargs = require('yargs/yargs')(process.argv.slice(2));

const args = yargs.argv;
const mode = args.m || 'FORK';

console.log(`mode: ${mode}`);


if(cluster.isPrimary && (mode === 'CLUSTER' || mode === 'cluster')){    //Cluster primario solo gestiona a los workers.

    console.log(`Primary process pid: ${process.pid} running..`);

    for(let i=0; i<numCpus; i++){
        
        cluster.fork(); //Creamos Subprocesos por nucleos del procesador

    }

    cluster.on('exit', (worker, code)=>{

        console.log(`Worker - pid: ${worker.process.pid} DIED`);

        cluster.fork(); //Si se cae uno, creamos otro worker.

    });

}else{

    const server = new Server();
    server.listen();

}

