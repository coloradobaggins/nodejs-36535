# Desafio 16 - Arquitectura en capas  

Express + Passport + Bcrypt + MongoDB + Yargs + process + Fork/cluster + gzip + Loggers

Ejecutar: 

node app -p 8080 -m fork -c false

-p (puerto) default: 8080
-m (modo): FORK || CLUSTER - default: FORK

o tambien:

npm start

Tomamos el entregable 14 y separamos en capas la arquitectura. (Se agrega capa servicios)