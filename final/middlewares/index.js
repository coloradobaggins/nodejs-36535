const {checkAuthentication} = require('./checkAuthentication');
const {checkFileUpload} = require('./checkFile');
const {checkUserRol, checkAdminRol } = require('./checkUserRol');


module.exports = {
    checkAuthentication,
    checkFileUpload,
    checkUserRol,
    checkAdminRol
}