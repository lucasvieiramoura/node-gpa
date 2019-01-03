'user strict'

var config = require ('../config');
var sendgird = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) =>{
    sendgird.send({
        to: to,
        from: 'lucas.moura@gpamg.com.br',
        subject: subject,
        html: body
    });
}