// 登录注册模块

define(["jquery"], $=> {
    function signupViewToggleListener(toggleObjectArray) {
	// toggleObjectArray =
	// [{buttonname: "name", viewname: "name"},
        //  {buttonname: "name", viewname: "name"}]
	for( i=0; i<toggleObjectArray.length; i++) {
	    var viewname = toggleObjectArray[i].viewname;
	    var buttonname = toggleObjectArray[i].buttonname;
	    $(buttonname).click(function(){
		$(viewname).fadeToggle("88");
	    })
	}
	
    }

    function turnToSignup(toggleObject){
	my_toggleObject = toggleObject;
	var buttonname = toggleObject.buttonname;
	var viewnames = toggleObject.viewnames;
	$(buttonname).click(function(){
	    for(let i=0; i<viewnames.length; i++)
		$(viewnames[i]).fadeToggle("88");
	})
    }

    function stopPropagation(viewname){
	if(viewname != null)
	    $(viewname).click(function(e){
		e.stopPropagation();
	    })
    }
    function closeSignupView(viewname){
	$(viewname).hide();
    }
    
    function signup(api, signup){
	var email = signup.email;
	var pass = signup.pass;
	// 使用get 方法注册不好
	// 可以直接在链接查看请求的数据
	// $.get(api,
	//       {
	// 	  email: email,
	// 	  pass: pass
	//       },
	//       function(data){
	// 	  console.log(data);
	//       }
	//      )
	// 使用post方法注册
	var data = {
	    email: email,
	    pass: pass
	};//请求的数据
	$.ajax({
	    url: api,
	    data: data,
	    type: "POST",
	    success: function(data){
		console.log("注册成功");
		console.dir(data);
	    },
	    error: function(xhr){
		console.log("注册失败");
		console.dir(xhr);
	    }
	})
    }

     // 初始化右上角登录组件
    function login_weight_init(){
	var token = localStorage.getItem("token");
	var userobject = localStorage.getItem("userobject");
	var login_btn_v = $(".button-login");
	var signup_btn_v = $(".button-signup");
	var u_v     = $(".user");
	// 未登录
	if(token == null || userobject == null){
	    login_btn_v.fadeIn();
	    signup_btn_v.fadeIn();
	    u_v.fadeOut();
	}else{//已登录
	    var user = JSON.parse(userobject);
	    if(user == null) return;
	    var username = user.nickname;
	    var useremail = user.email;
	    var useravatar = user.avatarurl;
	    var userid = user.userid;
	    var ubg = user.uimg;
	    $(".user-cover-username").text(username);
	    $(".user-cover-header")
		.css("background-image",
		     "url("+ubg+")");
	    
	    
	    login_btn_v.fadeOut();
	    signup_btn_v.fadeOut();
	    u_v.fadeIn();
	}
    }

    return { signupViewToggleListener,
	     stopPropagation,
	     closeSignupView,
	     turnToSignup,
	     signup,
	     login_weight_init
	   }
})
