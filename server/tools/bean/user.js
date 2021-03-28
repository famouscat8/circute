// 默认user对象
class UserBean{
    constructor(user){
	this.uimg = "https://s1.ax1x.com/2020/05/22/YOkjTs.png";
	this.user = {
	    nickname  : user.nickname || "Anonym",
	    username  : user.username || "Anonym",
	    time      : user.time,
	    psd       : user.psd,
	    uid       : user.uid,
	    uimg      : user.uimg || this.uimg,
	    avatarurl : user.avatarurl || '',
	    email     : user.email || '',
	};
    }
    
    set email(email){
	this.user.email = email;
    }
    
    get email(){
	return this.user.email;
    }
    
    set user(user){
	this.user = user;
    }
    
    get user(){
	return this.user;
    }
    
    set avatarurl(avatarurl){
	this.user.avatarurl = avatarurl;
    }
    
    get avatarurl(){
	return this.user.avatarurl;
    }
    
    set uimg(uimg){
	this.user.uimg = uimg;
    }
    
    get uimg (){
	return this.user.uimg;
    }

    set time(time){
	this.user.time = time;
    }

    set psd(psd){
	this.user.psd = psd;
    }
    
    set uid(uid){
	this.user.uid = uid;
    }

    get uid(){
	return this.user.uid;
    }

    set username(username){
	this.user.username = username;
    }
    
    get username(){
	return this.user.username;
    }
}

module.exports =UserBean;
