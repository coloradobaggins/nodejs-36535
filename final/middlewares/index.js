const {checkAuthentication} = require('./checkAuthentication');
const {checkFileUpload} = require('./checkFile');
const {checkUserRol} = require('./checkUserRol');


module.exports = {
    checkAuthentication,
    checkFileUpload,
    checkUserRol
}