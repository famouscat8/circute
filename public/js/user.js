// 用户个人主页

$(()=>{
    var usermanager = new UserManager();
    var ajax        = new MyAjax();
    var usertoken   = usermanager.getToken(); 
    var p_data      = {usertoken:usertoken,
    		       userid:"test",
    		       type:'test',};
    
    function su(data){
	// 显示用户发布的帖子
	mlist.initList(data.posts);
	// 显示用户基本信息
	mUserMessage.initUserMessage(data.user);
	// just for test
	console.dir(data);
	
    }
    function er(error){
	console.dir(error);
	
    }
    
    ajax.post("/getuser",JSON.stringify(p_data),su,er);
    //mlist.test();
})
