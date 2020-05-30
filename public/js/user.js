// 用户个人主页

$(()=>{
    var usermanager = new UserManager();
    var ajax        = new MyAjax();
    var usertoken   = usermanager.getToken(); 
    var p_data      = {usertoken:usertoken,
    		       userid:"test",
    		       type:'test',};
    function su(data){
	console.dir(data);
    }
    function er(error){
	console.dir(error);
    }
    
    ajax.post("/getuser",JSON.stringify(p_data),su,er);
    var n = new MyList();
    mlist.test();
    
})
