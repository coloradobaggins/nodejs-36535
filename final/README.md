# Final Ecommerce

(Express + Passport + Bcrypt + MongoDB + Mongoose + process + Loggers + chat (sockets) + Mail + SMS ...)  

Trabajo final de curso NodeJs Coderhouse.  
Profesores: Alex Marin Mendez | Luis Navas


## Install  

```  

npm install

```  

##  Ejecutar  

```  
npm start

```  

## Al crear un usuario  
Los usuarios se crean por default con rol USER_ROL.  
Cambiar manualmente a ADMIN_ROL para tener un administrador y poder realizar todas las acciones (Ej abm de productos, etc).  

## Mail & SMS  
Setear en .env los datos para el envio de mail y sms.  
Al regstrar un usuario se envia mail al mail administrador.  
Al confirmar una compra, se notifica por mail al mail administrador y se envia SMS al usuario que compro (cargar correctamente el numero al registro del mismo).    

Front seteado en puerto 3001 para consultas al server   