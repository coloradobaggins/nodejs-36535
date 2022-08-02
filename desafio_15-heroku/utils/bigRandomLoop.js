process.on('message', msg=>{                    //Recibido del padre (forked) = msg.cant

    process.send(computeRandoms(msg.cant));

});

/**
 * Objeto que contendrá como claves los números
 * random generados junto a la cantidad de veces que salió cada uno
 * @param {int} totalLoops
 * @returns Obj {}
 */
const computeRandoms = (totalLoops)=>{

    let cant = parseInt(totalLoops);

    let numbers = {};

    for(let i = 0; i < cant; i++){

        let num = Math.ceil(Math.random() * 1000) + 1;
        
        if(!numbers[num]){
            
            numbers[num] = 0;

        }
        
        numbers[num]++
                
    }

    return numbers;

}