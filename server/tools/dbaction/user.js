const UserBean = require("../bean/user")
const dbtools  = require("../db-redis")
const RandomCode = require("../randomcode")
const MailSender = require("../mailer")

class User {
    static #userPre  = "user:";
    static #userEmailPre = "user:email:";
    static #user;
#userbean;
    constructor(user){
	if(user!=null){
	    var userbean = new UserBean(user);
	    this.#userbean = userbean;
	}
    }
    
    set userbean(userbean){
	this.#userbean=userbean;
    }
    
    get userbean(){
	return this.#userbean;
    }

    getUserByUid(uid){
	return new Promise((resolve,reject)=>{
	    if(!Boolean(uid))reject("uid can not be null");
	    dbtools.hgetall(this.#userPre).then(user=>{
		resolve(user);
	    }).catch(e=>{
		reject(e);
	    })
	})
    }
    
    async getUserByEmail(email){
	if(!Boolean(email))
	    return Promise.reject("email can not be null");
	var uid = await dbtools.get("usernum").catch(e=>{
	    return Promise.reject("get uid error");
	})
	return new Promise((resolve,reject)=>{
	    dbtools.hgetall(this.#userPre).then(user=>{
		resolve(user);
	    }).catch(e=>{
		reject(e);
	    })
	})
    }

    existUserByEmail(email){
	return new Promise((resolve,reject)=>{
	    if(!Boolean(email))reject("email can not be null");
	    dbtools.get("user:email:"+email).then(r=>{
		if(!Boolean(r))reject("the user do not exist");
		else resolve("user exists");
	    }).catch(e=>{
		reject(e);
	    })
	})
    }
    
    getUidByEmail(email){
	return new Promise((resolve,reject)=>{
	    if(!Boolean(email))reject("email can not be null");
	    dbtools.get(this.#userEmailPre+email).then(uid=>{
		resolve(uid);
	    }).catch(e=>{
		reject(e);
	    })
	})
    }
    
    getEmailByUid(uid){
	return new Promise((resolve,reject)=>{
	    if(!Boolean(uid))reject("uid can not be null");
	    dbtools.hget(this.#userPre+uid,"email").then(emai=>{
		resolve(email);
	    }).catch(e=>{
		reject(e);
	    });
	})
    }

    // 获取邮箱注册用户的临时token
    getSignupTokenByEmail(email){
	return new Promise((resolve,reject)=>{
	    if(!Boolean(email))reject("email can not be null");
	    dbtools.get("email:signup:"+email).then(token=>{
		resolve(token);
	    }).catch(e=>{
		reject(e);
	    })
	});
    }

    // 用户通过email 注册
    signup(email,token, userbean){
	return new Promise((resolve,reject)=>{
	    if(!Boolean(email))reject("email can not be null");
	    dbtools.get("user:email:"+email).then(r=>{
		if(r!=null)
		    resolve({state:'-1',m:'邮箱已经注册啦'});
		else{
		    var user;
		    if(userbean instanceof UserBean)
			user = userbean;
		    else if(userbean == null)
			user = this.#userbean;
		    else reject("unknown user object");
		    this.#addUser(user)
			.then(r=>{resolve(r);})
			.catch(e=>{reject(e);})
		}
	    }).catch(e=>{
		reject(e);
	    })
	})
    }

    // 向邮箱注册用户颁发临时token
    // 并存入redis email:signup:email中
    async postSignupTokenToEmail(email){
	var code = RandomCode.createCode(5);
	var html = "<h2>感谢注册CIRCUTE</h2> 宁的验证码是:"+code;
	var expireTime = 300;
	if(!Boolean(email)) return "email can not be null";
	var isSignup = await dbtools
	    .get("user:email:"+email)
	    .catch(e=>{return e;});
	if(isSignup != null)
	    return "the user already signup";
	var setCode = await dbtools
	    .set("email:signup:"+email,code)
	    .catch(e=>{return e});
	var expire = await dbtools
	    .expire("email:signup:"+email,expireTime)
	    .catch(e=>{return e});
	var sendMail = await MailSender
	    .sendSignupMail(email,html)
	    .catch(e=>{return e});
	return [isSignup,setCode,expire,sendMail];
    }

    // 从数据库删除一个用户
    delUser(){
	if(this.userbean==null||this.userbean=={})
	    return Promise.reject("user can not be null");
    }
    
    // 添加一个用户到数据库
#addUser = async function(userbean){
    if(userbean==null||userbean=={})
	return Promise.reject("user can not be null");
    var uid    = await dbtools.get('usernum').catch(e=>{
	return Promise.reject(["get user id error",e]);
    })
    var addUid = await dbtools.incrby('usernum',1)
	.catch(e=>{
	    return Promise.reject(["add usernum error",e])
	});
    
    userbean.user.uid = uid;
    var saveUser  = dbtools
	.hmset("user:"+uid,userbean.user);
    var saveEmail = dbtools
	.set("user:email:"+userbean.user.email,uid);
    Promise.all([saveUser,saveEmail]).then(r=>{
	return Promise.resolve({state:'1',r:r});
    }).catch(e=>{
	return Promise.reject({state:'-1',e:e});
    })
}



}

module.exports = User;
