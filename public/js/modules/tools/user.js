define(function(){
    function setUser(user){
	return new Promise((resolve, reject)=>{
	    if(user){
		localStorage.setItem("userobject",
				     JSON.stringify(user));
	    	resolve("1");
	    }
	    reject({state: "-1",e:"user can not be null"});
	})
    }
    function getUser(){
	let _user = localStorage.getItem("userobject");
	return JSON.parse(_user);
    }
    function setToken(token){
	return new Promise((resolve, reject)=>{
	    if(token){
		localStorage.setItem("token", token);	
		resolve("1");
	    }
	    reject({state: "-1",e:"token can not be null"});
	});
    }
    function getToken(){
	return localStorage.getItem("token");
    }
    function delToken(){
	localStorage.removeItem("token");
	return 1;
    }
    function delUser(){
	localStorage.removeItem("userobject");
	return 1;
    }

    function delUM(){
	localStorage.removeItem("token");
	localStorage.removeItem("userobject");
	return 1;
    }
    function verifyToken(token,$){
	return new Promise((resolve,reject)=>{
	    if(token){
		$.ajax({
		    type:"POST",
		    contentType:"application/json;charset=UTF-8",
		    url:"/verifytoken",
		    data:JSON.stringify({token:token}),
		    success:r=>{
			if(r.state=="1")
			    resolve(r);
			reject(r);
		    },
		    error:e=>{reject(e)}
		});
	    }else{
		reject({state:"-1",e:"token can not be null"});
	    }
	})
    }

    return{
	setUser,
	getUser,
	delUser,
	setToken,
	getToken,
	delToken,
	verifyToken,
	delUM,
    }
})
