const async = require("hbs/lib/async")
const nodemailer = require ("nodemailer")
const smtpConfig ={
    service:"gmail",
    auth:{
        user:"ntiProjectg15@gmail.com",
        pass:"test123@"
    }
}
const sendMyEmail = async()=> {
    try{
        const transporter = await nodemailer.createTransport(smtpConfig)
        const mailOptions = {
            from: "test email",
            to: "ntiProjectg15@gmail.com",
            subject: "welcome at our awsome website",
            text:"hello there. How are you ? We just send this email to celebrate with you that you entered our website"
        }
        await transporter.sendMail(mailOptions)
    }
    catch(e){
        console.log(e.message)
    }
}
module.exports = sendMyEmail
