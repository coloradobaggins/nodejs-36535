const os = require('os');

const numCpus = os.cpus().length;

const getSystemInfo = () => {
    
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

    return dataObj;

}

module.exports = { getSystemInfo }