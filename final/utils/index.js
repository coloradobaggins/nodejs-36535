const emailSender = require('./emailSender');
const logger = require('./logger');
const passUtils = require('./passUtils');

module.exports = {
    ...emailSender,
    ...logger,
    ...passUtils
}
/*
... si alguno de los modules exporta alguna propiedad, cons, variable, tambien la obtenemos en este module.export
*/