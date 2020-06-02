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
var transporter = nodemailer.createTransport(config);

var sendSignupMail =(to,html)=>{
    var mailOptions = {
	from   : "3142362556@qq.com",
	to     : to,
	subject: "注册CIRCUTE",
	html   :html,
    };
    
    return new Promise((resolve,reject)=>{
	transporter.sendMail(mailOptions, function(err, info){
	    if(err)reject(err);
	    resolve(info);
	});
    })
};

module.exports.sendSignupMail = sendSignupMail;
