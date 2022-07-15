## Productos

## Carrito

MONGODB:
.Listar un carrito por id de carrito:
localhost:8080/api/carrito/62d09162281f94ae9827f960/productos

.Crear un carrito:
(Se envian producto/s y lo crea)

{
    "productos":[
        { 
            "name": "Control",
            "description": "marca",
            "code": 12,
            "price": "4200",
            "stock": 8,
            "thumbnail": "",
            "timestamp": 1656891035535,
            "id": 2
        }
    ]
}


.Eliminar un carrito:
localhost:8080/api/carrito/62d09162281f94ae9827f960

.Agregar producto a carrito x id

Ej producto body:
{
    "name": "producto",
    "description": "marca",
    "code": 142,
    "price": 40,
    "stock": 4,
    "thumbnail": "",
    "timestamp": 1657024839475,
    "id": 1
}

.Borra un producto (x id) de un carrito (x id):

localhost:8080/api/carrito/62d09162281f94ae9827f960/productos/2