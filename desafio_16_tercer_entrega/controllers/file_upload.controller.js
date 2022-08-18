const path = require('path');


let postFileUpload = (req, res, next)=>{

    console.log(`Subiendo foto..`);


    const file = req.file;

    if(!file){
        const error = new Error('Por favor suba una foto');
        error.httpStatusCode = 400;
        return next(error)
    }

    console.log(`Guardar img en db`);

    const imgName = req.file.filename

    console.log(`filename: ${imgName}`);

    res.json({message: `Successfully uploaded files`});

}

module.exports = {postFileUpload};