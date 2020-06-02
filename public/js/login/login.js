// 登录界面

$(()=>{
    var ajax = new MyAjax();
    var layer_index = null;
    function login_success(user,token){
	var usermanager = new UserManager();
	var setUser     = usermanager.setUser(user);
	var setToken    = usermanager.setToken(token);
	Promise.all([setUser,setToken]).then(a=>{
	    layer.msg("登录成功");
	    setTimeout(()=>{
		history.go(-1);
	    },1500);
	}).catch(es=>{
	    layer.msg("本地系统错误");
	})
    }
    
    function login(){
	var email = $(".email").val();
	var pass  = $(".pass").val();
	    pass  = hex_md5(pass);
	var user  = {
	    email: email,
	    pass : pass,
	    type : 2,
	}
	var success = r=>{
	    layer.close(layer_index);
	    console.dir(r);
	    if(r.state=="1")
		login_success(r.user,r.token);
	    else if(r.state=="-2")
		layer.msg("系统错误,请联系站长");
	    else if(r.state=="-3")
		layer.msg("帐号或密码错误");
	    else if(r.state=="-4")
		layer.msg("用户不存在");
	    else if(r.state=="-5")
		layer.msg("生成token 错误");
	    else layer.msg(r.m);
	}
	var error  = e=>{
	    layer.close(layer_index);
	    console.dir(e);
	    layer.msg("登录失败");
	}
	ajax.post("/login", JSON.stringify(user),success,error);
    }
    
    $(".login").click(()=>{
	layer_index = layer.load(1,{shade:[0.3,"#000"]});
	login();
    })
    
})
