const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'superstoreawesome@gmail.com',
        pass: 'AwesomeSuperstore@1234',
    },
    secure: true,
})

export const constructOTPEmail = (otp, recipientEmail) => {
    return {
        from: 'superstoreawesomel@gmail.com',  // sender address
        to: recipientEmail,  
        subject: 'Your OTP Code',
        text: `Your OTP Code is ${otp}`,
    }
}