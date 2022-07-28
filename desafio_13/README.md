# Desafio 13 - Servidor con balance de carga  

Express + Passport + Bcrypt + MongoDB + Yargs + process + Fork/cluster + NGINX (Load balancer)  

Ejecutar: 

node app -p portNumber -m modo  
modo puede ser: FORK || CLUSTER  
(Si no se pasa el puerto, toma por defecto el 8080. Si no se pasa el modo, por defecto es fork)  

Con nodemon:  
nodemon app -p portNumber -m modo  

## NGINX + PM2 - Load Balancer  

nginx config:  
Ver en: /nginx_config  


Modo pm2 FORK:  

pm2 start app.js --watch -- -- PUERTO

Para ruta: /api/randoms/  

Modo pm2 CLUSTER:  

pm2 start app.js --name="server8082" --watch -i NUM_PROCESOS -- -- 8082  
pm2 start app.js --name="server8083" --watch -i NUM_PROCESOS -- -- 8083  
pm2 start app.js --name="server8084" --watch -i NUM_PROCESOS -- -- 8084  
pm2 start app.js --name="server8085" --watch -i NUM_PROCESOS -- -- 8085  

(-i NUM_PROCESOS crea la cantidad de procesos especificados. max es igual a la cantidad de nucleos que tenga el cpu del server)    

Monitorear rendimiento:  
pm2 monit  

Luego de los comandos de pm2, acceder a la url:

localhost:8080/api/randoms

Eliminar todos los procesos:  
pm2 delete all  

Eliminar proceso por id  
pm2 delete id_num  

Comandos NGINX:  

./nginx.exe -s stop  
./nginx.exe -s reload  