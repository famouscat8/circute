// token工具类
const jwt = require("jsonwebtoken")
const token_secret = "mysecret";

var secret = token_secret;

// 验证token
async function verify(token, token_secret){
    return new Promise((resolve, reject)=>{
	jwt.verify(token, token_secret, (err, decode)=>{
	    if(err) reject(err); 
	    resolve(decode)
	})
    })
}

// 生成token
async function create(content,extra){
    return new Promise((resolve,reject)=>{
	if(content&&extra){
	    var _token=jwt.sign(content,secret,extra);
	    resolve(_token);
	}else{
	    reject({state: "-1",
		    e:"content or extra can not be null"});
	}
    })
}

module.exports = {
    verify,
    create,
    secret,
}
