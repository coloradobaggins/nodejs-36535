const numCpus = require('os').cpus().length;

const getInfo = (req, res)=>{

    
    const dataObj = {
        argv: process.argv.slice(2),
        platform: process.platform,
        nodeV: process.version,
        rssMemory: process.memoryUsage.rss(),
        execPath: process.execPath,
        processId: process.pid,
        actualDir: process.cwd(),
        numCpus
    }


    res.render('info', {
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email,
        dataObj
    });
    
}

module.exports = { getInfo };