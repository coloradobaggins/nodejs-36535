
const { createTransport } = require('nodemailer');

//const sendEmailNotification = (data)=>{
const sendEmailNotification = (theSubject, htmlBody)=>{

    console.log(`Enviando email... data:`);

    const ADMIN_MAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASS = process.env.ADMIN_EMAIL_PASS;

    const transporter = createTransport({

        host: process.env.ADMIN_EMAIL_HOST,
        port: process.env.ADMIN_EMAIL_PORT,
        auth: {
            user: ADMIN_MAIL,
            pass: ADMIN_PASS
        }
    });

    
    const mailOptions = {
        from: 'theecommerce',
        to: 'bugio89@gmail.com',
        subject: theSubject
    }

    mailOptions.html = htmlBody;    //Agregamos msg..
    

    transporter.sendMail(mailOptions)
    .then(info => console.log(info))
    .catch(err => console.log(err))

}

module.exports = {sendEmailNotification}
