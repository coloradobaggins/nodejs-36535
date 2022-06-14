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

/****************************** */

let booksObj = [
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


let petsObj = ['Vicente', 'Rufina'];

let usuario = new Usuario('Armando', 'Bugiolacchi', booksObj, petsObj);

console.log(`user Full Name: ${usuario.getFullName()}`);
console.log(`countMascotas user: ${usuario.countMascotas()}`);

//Add new pet
usuario.addMascota('pepe');

console.log(`countMascotas user: ${usuario.countMascotas()}`);

//Add new book
usuario.addBook('Processing', 'Casey Reas');


console.log(`Books names:`)
console.log(usuario.getBooksName());

