var nodemailer = require('nodemailer');

const sendEmail=async(email, subject, text)=> {

    
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASSWORD,
            }
        });
    
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: subject,
            text: text
        };
    
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return 0;
            } else {
                console.log('Email sent: ' + info.response);
                return 1;
            }
        }); 

    } catch (error) {
        console.log("something went wrong ");
        console.log(error);
    }
}




module.exports = sendEmail ;












    