
const { createTransport } = require('nodemailer');

const sendEmailNotification = (data)=>{

    console.log(`Enviando email... data:`);
    console.log(data);
    /*
    const ADMIN_MAIL = 'dewitt.oberbrunner@ethereal.email';
    const ADMIN_PASS = '46zPSbGv9tPdePkcc7';
    */

    const ADMIN_MAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASS = process.env.ADMIN_EMAIL_PASS;

    const transporter = createTransport({
        //host: 'smtp.ethereal.email',
        //port: 587,
        host: process.env.ADMIN_EMAIL_HOST,
        port: process.env.ADMIN_EMAIL_PORT,
        auth: {
            user: ADMIN_MAIL,
            pass: ADMIN_PASS
        }
    });

    const mailOptions = {
        from: 'telecom ecommerce',
        to: 'bugio89@gmail.com',
        subject: 'ALTA NUEVO USUARIO',
        html: `<h1 style="color: blue;">Un nuevo <span style="color: green;">USUARIO</span> se registro en el sistema</h1>
        <h2>Sus datos son:</h2>
        <ul>
            <li><b>Usuario:</b> ${data.username}</li>
            <li><b>Nombre:</b> ${data.name}</li>
            <li><b>Email:</b> ${data.email}</li>
            <li><b>Edad:</b> ${data.age}</li>
            <li><b>Direccion:</b> ${data.address}</li>
            <li><b>Telefono:</b> ${data.phone}</li>
        </ul>`
    }

    transporter.sendMail(mailOptions)
    .then(info => console.log(info))
    .catch(err => console.log(err))

}

module.exports = {sendEmailNotification}
