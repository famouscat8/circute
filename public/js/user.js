// 用户个人主页

$(()=>{
    var usermanager = new UserManager();
    var ajax        = new MyAjax();
    var usertoken   = usermanager.getToken(); 
    var p_data      = {usertoken:usertoken,
    		       userid:"test",
    		       type:'test',};
    
    var pd  = JSON.stringify({
	action:["name/cos:GetService"]
    });
    var mycos = null;
    function init(data){
	ajax.post("/sts",pd,tmpkeys=>{
	    console.dir(tmpkeys);
	    mycos = new MyCOS(tmpkeys);
	    // 显示用户基本信息ajax connect to server
	    mUserMessage.initUserMessage(data.user,ajax,mycos,
					 usermanager);
	},e=>{
	    mycos = null;
	});
    }


    function su(data){
	// 显示用户发布的帖子
	mlist.initList(data.posts);
	console.dir(data);
	init(data);
    }
    function er(error){
	console.dir(error);
	
    }
    
    ajax.post("/getuser",JSON.stringify(p_data),su,er);
})
