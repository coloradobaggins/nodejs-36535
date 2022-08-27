const path = require('path');
const { v4: uuidv4 } = require('uuid'); //Obtengo v4 y renombro a uuidv4

/**
 * 
 * @param {File} file 
 * @param {String} folder 
 * @param {Array} validExtension 
 * @returns Promise, uploaded file fullname
 */
const uploadFile = (file, validExtension = ['jpg', 'jpeg', 'png', 'gif', 'webp'], folder = '')=>{

    return new Promise((resolve, reject) =>{

        const fileName = file.name;
        const fileNameArr = fileName.split('.');
        const fileExtension = fileNameArr[fileNameArr.length - 1];

        if(!validExtension.includes(fileExtension)){
            return reject(`Extension de archivo invalida.`);
        }

        const uniqueName = uuidv4();
        const uniqueFullName = uniqueName+'.'+fileExtension;

        const uploadPath = path.join(__dirname, '../uploads/', folder, uniqueFullName);

        // Use the mv() method to place the file somewhere on your server (move)
        file.mv(uploadPath, function(err) {

            if (err){
                console.log(err);
                reject(err);
            }
                
        });

        resolve( uniqueFullName );

    });

}


module.exports = {uploadFile}