import nodeMailer from "nodemailer";

export const sendMail = async(email,title,subject)=>{
    try {
        const transporter = nodeMailer.createTransport({
            host : process.env.MAIL_HOST,
                auth : {
                    user : process.env.MAIL_USER,
                    pass : process.env.MAIL_PASS
                }
        });
        const info = await transporter.sendMail({
            from : "Dev Diaries",
            to : `${email}`,
            title : `${title}`,
            html : `${subject}`
        })
        return info ;
    } catch (error) {
        console.log(error.message)
    }
}