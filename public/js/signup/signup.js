// 注册逻辑

$(()=>{
    var ajax = new MyAjax();
    var layer_index = null;
    function signup(userobject){
	layer_index = layer.load(1,{shade:[0.5,"#000"]});
	var success = data=>{
	    console.dir(data);
	    layer.close(layer_index);
	    layer.msg("注册成功");
	}

	var error = e=>{
	    console.dir(e);
	    layer.close(layer_index);
	    layer.msg("注册失败");
	}
	ajax.post("/signup",
		  JSON.stringify(userobject),
		  success,error);
    }

    function getRandomCode(userobject){
	var success = data=>{
	    if(data.state=="-1"){
		layer.msg("验证码发送失败:"+data.m);
	    }else if(data.state=="-2"){
		layer.msg(data.m);
	    }
	}
	var error= e=>{
	    layer.msg("验证码发送失败");
	}
	ajax.post("/getemailtoken",
		  JSON.stringify(userobject),
		  success,error);
    }

    $(".signup").click(()=>{
	var token = $(".user-token").val();
	var email = $(".user-email").val();
	var pass  = $(".user-pass").val();
	var pass2 = $(".user-passcomfir").val();
	var is    = isRegisterPass(pass,pass2);
	if(is=="-1"){
	    layer.msg("两次输入的密码不一样");
	    return;
	}else if(is=="-2"){
	    layer.msg("密码不符合规范");
	    return;
	}
        pass  = hex_md5(pass);
	var user = {
	    token: token,
	    email: email,
	    type : 1,
	    password: pass,
	};
	signup(user);
    })
    
    $(".user-sendtoken").click(()=>{
	var email = $(".user-email").val();
	var user = {
	    token: '',
	    email: email,
	    type : 1,
	    password: '',
	};
	sendBtnAble();
	getRandomCode(user);
    })

    function sendBtnAble(){
	var end = 60;
	$(".user-sendtoken").attr("disabled",true);
	$(".user-sendtoken").text(end+"s后重试");
	var index = setInterval(()=>{
	    end--;
	    $(".user-sendtoken").text(end+"s后重试");
	    if(end<=0){
		clearInterval(index);
		$(".user-sendtoken").text("发送验证码");
		$(".user-sendtoken").attr("disabled",false);
	    }
	},1000);
    }

    // 用户信息校验
    function isRegisterPass(pass1,pass2){
	if(pass1!=pass2)return "-1";
	var patrn=/^[\w_-]{6,16}$/;
	if(!patrn.exec(pass1))return "-2";
	return "1"
    }

    
})

