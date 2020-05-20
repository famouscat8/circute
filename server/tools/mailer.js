// 向客户端发送邮件的工具类
const nodemailer = require("nodemailer")

const config = {
    host: "smtp.qq.com",
    port: 465,
    auth: {
	user: "3142362556@qq.com",
	pass: "ismwzmtzcjzldgga"
    }
};
const transporter = nodemailer.createTransport(config);

var sendSignupMail = function(mail){
    transporter.sendMail(mail, function(error, info){
	if(error){
	    return console.log(error);
	} 
	console.log("mail sent: ", info.response);
    });
};

// 发送邮件
module.exports.sendSignupMail = sendSignupMail;
