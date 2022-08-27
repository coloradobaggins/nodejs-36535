const winston = require('winston');

const loggers = {

    infoLogger: winston.createLogger({
        level: 'info',
        format: winston.format.json(),

        transports: [
            new winston.transports.Console({
                level: 'info'
            })
        ]
    }),

    warnLogger: winston.createLogger({
        level: 'warn',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({
                level: 'warn',
                filename: './logs/warn.log'
            })
        ]
    }),

    errorLogger: winston.createLogger({
        level: 'error',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({
                level: 'error',
                filename: './logs/error.log'
            })
        ]
    })

}

module.exports = {loggers};