const { loggers } = require('../utils/logger')

const notFound = (req, res)=>{
        
    loggers.warnLogger.warn(`Url: ${req.originalUrl}, Method: ${req.method}`);

    res.render('404');

}

module.exports = { notFound }