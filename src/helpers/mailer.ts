
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
import User from "@/src/models/userModels"

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if (emailType === "VERIFY") {
             await User.findByIdAndUpdate(
              userId,
            {  verifyToken:hashedToken,
              verifyTokenExpiry: Date.now() + 3600000
            });

        }
          if (emailType === "RESET") {
             await User.findByIdAndUpdate(
               userId,
             {  forgotPasswordToken: hashedToken,
               forgotPasswordTokenExpiry: Date.now() + 3600000,
             });
          }

       const transport = nodemailer.createTransport({
         host: process.env.MAILTRAP_SMTP_HOST,
         port: Number(process.env.MAILTRAP_SMTP_PORT),
         auth: {
           user: process.env.MAILTRAP_SMTP_USER,
           pass: process.env.MAILTRAP_SMTP_PASS,
         },
       });
       const link =
         emailType === "VERIFY"
           ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
           : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;
         const mailOptions = {
           from: "example@gmail.com", // sender address
           to: email,
           subject:
             emailType === "VERIFY"
               ? "verify your email"
               : "reset your password", // subject line
           html: `<p>Click <a href="${link}"> here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${link} </p>`,
         };
        const mailresponse = await transport.sendMail(mailOptions)
        return mailresponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}