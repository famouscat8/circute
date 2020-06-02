// 登录界面的js

(()=>{
    requirejs.config({
	baseUrl: "js/",
	paths: {
	    "jquery": "libs/jquery",
	    "md5": "libs/md5",
	    "layer": "libs/layer/layer",
	    "u_manager": "modules/tools/user"
	}
    })
    requirejs(["jquery","md5","layer","u_manager"],
	      ($,md5,layer,u_manager)=>{
		  var token = u_manager.getToken();
	if(token){		// token not null
	    var usertoken ={token: token};
	    $.ajax({
		type: "POST",
		contentType: "application/json;charset=UTF-8",
		url: "/verifytoken",
		data: JSON.stringify(usertoken),
		success: result=>{	
		    if(result.state == "1"){
			// 身份有效,转到个人主页
			layer.msg("已登录",{time: 2000});
		    } else{
			u_manager.delToken();
			u_manager.delUser();
			layer.msg("身份过期,请重新登录",{
			    time: 2000
			});
		    }
		},
		error:e=>{		// 身份无效,重新登录
		    u_manager.delToken();
		    u_manager.delUser();

		    layer.msg("身份无效,请重新登录",{
			time: 2000
		    });
		}
	    })
	}else{}	
	
	var btn_login = $(".btn-login");
	btn_login.click(()=>{
	    var layer_index=layer.load(1, {
		shade: [0.1, "#fff"]
	    });
	    var username  = $(".input-username").val();
	    var userpsd   = $(".input-psd").val();
	    var login_data = {
		userid: username,
		pass: hex_md5(userpsd),
		type: "2"
	    }
	     
	    $.ajax({
		type: "POST",
		contentType: "application/json;charset=UTF-8",
		url: "/login",
		data:JSON.stringify(login_data),
		success:result=>{
		    layer.close(layer_index);
		    if(result.state=="-4")
			layer.msg("账号未注册");
		    if(result.state=="1"){
			u_manager.setToken(result.token)
			    .then(data=>{
				u_manager.setUser(result.user)
				    .then(data=>{
					layer.msg("登录成功");
					let _t=setTimeout(
					    ()=>{
						history.go(-1)
						clearInterval(
						    _t
						);
					    },300);
				    }).catch(e=>{
					if(e.state=="-1")
					    layer.msg("登录失败");
				    })
			    }).catch(e=>{
				if(e.state=="-1")
				    layer.msg("登录失败");
			    })
		    }
		    if(result.state=="-3")
			layer.msg("账号或密码错误");
		    console.dir(result);
		    
		},
		error:e=>{
		    layer.close(layer_index);
		    layer.msg("登录失败");
		    console.dir(e);
		}
	    })
	    
	});
	
    })
})()
