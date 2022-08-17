class ProductDTO{

    constructor(product){

        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;

        //Podria hacer combinacion de campos y devolverlo.

    }

}

module.exports = ProductDTO;