'use strict';

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

class EmailService {
    async send(to, subject, body) {
        sendgrid.send({
            to: to,
            from: 'hello@balta.io',
            subject: subject,
            html: body
        });
    }
}

module.exports = EmailService;
