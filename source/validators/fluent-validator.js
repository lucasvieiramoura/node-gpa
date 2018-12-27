'use strict'

let errors =[];

function ValidationContract(){
    errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <=0)
        erros.push({ message: message});
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        erros.push({ message: message});
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        erros.push({ message: message});
}

ValidationContract.prototype.isFixedLen = (value, flen, message ) => {
    if (!value || value.length != flen)
        erros.push({ message: message});
}

ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        erros.push({ message: message});
}

ValidationContract.prototype.errors = () =>{
    return errors;
}

ValidationContract.prototype.clear = () =>{
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;