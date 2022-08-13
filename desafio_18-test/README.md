## Desafio 18  
# Test: MOCHA, CHAI, CHAI-HTTP  

Rutas productos:  

GET     /products/:id?  
POST    /products/  
PUT     /products/:id  
DELETE  /products/:id  

# Instalar paquetes:  

npm install  

# Ejecutar:  

npm start  

# Ejecutar Tests:  

npm test  

Setear puerto 8080 para correr los test  
(El puerto en la ruta de los test estan seteados en el 8080)  

## Tests:  

```

> desafio_18@1.0.0 test
> mocha src/test/      

Server listening on port 8080


  GET products/
MongoDB connected
    ✔ Deberia obtener array de todos los productos  (70ms)  
    ✔ No deberia obtener productos, url erronea  

  POST - Insertar nuevo producto
    ✔ Deberia agregar un nuevo producto (41ms)
    ✔ Deberia haber incrementado en uno el largo del array de productos

  UPDATE - Actualiza un producto
    ✔ Deberia actualizar datos de un producto por su id
    ✔ No deberia actualizar sin ID de producto

  DELETE - Elimina producto
    ✔ Debe eliminar un producto por su id
    ✔ Debe comprobar que el largo del array se haya disminuido en uno


  8 passing (190ms)

  ```  
  