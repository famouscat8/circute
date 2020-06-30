// 向客户端发送邮件的工具类
const nodemailer = require("nodemailer")
var test = "navsavivpjandfca";
const config = {
    host: "smtp.qq.com",
    port: 465,
    auth: {
	user: "3131677112@qq.com",
	pass: "ioxfkqtwjatpdgih"
    }
};
var transporter = nodemailer.createTransport(config);

var sendSignupMail =(to,html)=>{
    var mailOptions = {
	from   : "3131677112@qq.com",
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
