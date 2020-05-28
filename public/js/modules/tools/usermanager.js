class UserManager{
    constructor(){}
    
    setUser(user){
	return new Promise((resolve,reject)=>{
	    if(user){
		localStorage.setItem("userobject",
				     JSON.stringify(user));
		resolve("1");
	    }
	    reject({state:"-1",e:"user can not be null"});
	})
    }

    getUser(){
	return JSON.parse(localStorage.getItem("userobject"));
    }

    setToken(token){
	return new Promise((resolve,reject)=>{
	    if(token){
		localStorage.setItem("token", token);
		resolve(token);
	    }
	    reject({state:"-1",e:"token can not be null"});
	    
	})
    }

    getToken(){
	return localStorage.getItem("token");
    }
    delToken(){
	localStorage.removeItem("token");
	return 1;
    }
    delUse(){
	localStorage.removeItem("userobject");
	return 1;
    }

    delUM(){
	localStorage.removeItem("token");
	localStorage.removeItem("userobject");
	return 1;
    }
    verifyToken(token,$){
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

    
}


