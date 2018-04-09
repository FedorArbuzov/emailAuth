var nodemailer = require('nodemailer');
var config = require('../config/keys');
//todo: ну, надо сделать, чтобы все было красиво с темплейтами и тд

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.emailInfo.email,
        pass: config.emailInfo.pass
    }
});


exports.sendEmail = function (template, email) {

    var mailOptions = {
        from: config.emailInfo.email,
        to: email,
        subject: 'Sending Email using Node.js',
        text: template
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw error;
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}