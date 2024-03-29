const numCpus = require('os').cpus().length;

const getInfo = (req, res)=>{

    
    console.log(process.argv.slice(2));

    
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

    console.log(dataObj.argv);

    res.render('info', {
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email,
        dataObj
    });
    
}

module.exports = { getInfo };