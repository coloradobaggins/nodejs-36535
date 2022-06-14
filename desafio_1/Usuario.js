class Usuario{

    constructor(nombre, apellido, libros = [], mascotas = [])
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    /**
     * getFullName()
     * 
     * @returns {String} User full name
     */
    getFullName()
    {
        return `${this.nombre} ${this.apellido}`;
    }

    /**
     * addMascota()
     * 
     * @param {String} name 
     */
    addMascota(name){

        this.mascotas.push(name);

    }

    /**
     * countMascotas()
     * 
     * @returns {Int} pet total
     */
    countMascotas(){

        return this.mascotas.length;

    }

    /**
     * addBook()
     * 
     * @param {String} name 
     * @param {String} author 
     */
    addBook(name, author){

        this.libros.push({nombre:name, autor:author});

    }

    /**
     * getBooksName()
     * 
     * @returns {String[]} books names
     */
    getBooksName(){
        
        return this.libros.map((book)=> book.nombre);

    }


}

let librosUser1 = [
    {
        nombre: 'El señor de los Anillos',
        autor: 'JRR Tolkien'
    },
    {
        nombre: 'El Hobbit',
        autor: 'JRR Tolkien'
    },
    {
        nombre: 'The Nature of Code',
        autor: 'Daniel Shiffman'
    }
];


let mascotasUser1 = ['Vicente', 'Rufina'];

let user1 = new Usuario('Armando', 'Bugiolacchi', librosUser1, mascotasUser1);

console.log(`User1 Full Name: ${user1.getFullName()}`);
console.log(`cantMascotas user1: ${user1.countMascotas()}`);

user1.addMascota('pajaro');

console.log(`cantMascotas user1: ${user1.countMascotas()}`);
console.log(`Books:`)


user1.addBook('El libro nuevo', 'un loco');


console.log(`Books NAMES:`)
console.log(user1.getBooksName());

