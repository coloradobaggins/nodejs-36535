# Desafio 14 - Loggers, Gzip, Analisis de performance  

Express + Passport + Bcrypt + MongoDB + Yargs + process + Fork/cluster + gzip + Loggers

Ejecutar: 

node app -p 8080 -m fork -c false

-p (puerto) default: 8080
-m (modo): FORK || CLUSTER - default: FORK

Ruta /info con compression gzip  

## Artillery  
Ejecitar en puerto 3001 para evitar el bloqueo del puerto. (8081 rechaza la operacion)  

Correr app modo fork:  

node app -p 3001 -m FORK  

Correr testeo con artillery (en otra consola):  

artillery quick --count 50 -n 20 http://localhost:3001/info > result_fork.txt  

Correr app modo cluster:  

node app -p 3001 -m CLUSTER  

artillery quick --count 50 -n 20 http://localhost:3001/info > result_cluster.txt  

## Perfilamiento del servidor:  

Ejecutar:

node --prof app.js -p 3001  
(Este comando genera arhivo isolate-xxx.log, necesario para procesarlo con --prof-process filename.log)

(En otra consola: )  

artillery quick --count 50 -n 20 http://localhost:3001/info > test_info.txt  

node --prof-process isolate-test-v8.log (Reemplazar por nombre de archivo que genere)   

Los archivos de testeos estan en la carpeta artiller_test  
