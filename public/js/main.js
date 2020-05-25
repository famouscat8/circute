// index.html 的 js
(function (){
    requirejs.config({
	baseUrl: "js/",
	paths: {
	    "alerter": "modules/alerter",
	    "dataService": "modules/dataService",
	    "firstpage": "modules/firstpage/firstpage",
	    
	    "signup": "modules/signup",
	    // 第三方库
	    "jquery": "libs/jquery",
	    "layer": "libs/layer/layer",
	    // 管理用户对象
	    "u_manager": "modules/tools/user",
	    // html dom 操作工具
	    "dom":"modules/tools/dom",
	    "localdb":"modules/tools/localdb",
	    "tools":"modules/tools/tools",
	    "viewtools":"modules/tools/viewtools",
	}
    })
    var deps = ["jquery", "signup","layer",
		"u_manager","dom","localdb",
		"tools","viewtools"];
    // 初始化界面(首页初始化)
    requirejs(deps,($,signup,layer,
		    u_m,dom,localdb,tools,
		   viewtools)=>{
	// 判断用户token是否有效
	var token=u_m.getToken();
	console.log("token:"+token);
	u_m.verifyToken(token,$).then(r=>{
	    $(".btn-login").fadeOut();
	    $(".btn-signup").fadeOut();
	    $(".user").fadeIn();
	    var user=u_m.getUser();
	    $(".username").text(user.nickname);
	    $(".useravatar").attr("src",user.avatarurl);
	    $(".user-cover-username").text(user.nickname);
	    $(".user-cover-header").css("background-image",
		     "url("+user.uimg+")");
	    $(".btn-logout").click(()=>{
		if(u_m.delUM()==1)location.reload();
	    })
	    $(".btn-settings").click(()=>{
		layer.msg("个人中心");
	    })
	}).catch(e=>{	// token verify error
	    $(".btn-login").fadeIn();
	    $(".btn-signup").fadeIn();
	    $(".user").fadeOut();
	    u_m.delUM();
	    layer.msg("身份过期");
	})
	$(".btn-tools-wenku").click(()=>{});
	
	// 将标题临时保存在localStorage:spost_title
	$(".startfunny-start").click(()=>{
	    var title=$(".startfunny-title").val();
	    localdb.setItem("spost_title",title).then(r=>{
		layer.msg("标题已保存");
		var url=location.href+"post.html";
		// 新标签打开编辑帖子界面
		window.open(url);
	    }).catch(e=>{
		layer.msg("标题保存失败:" +e.e)
	    });
	});
	
	// 从服务器获取帖子
	$.ajax({
	    type:"POST",
	    contentType:"application/json;charset=UTF-8",
	    url:"/post",
	    data:JSON.stringify({page:1,pagesize:10,}),
	    success:re=>{
		console.log("main.js>post:/post");
		console.dir(re);
		if(re.state=="1")
		    viewtools.item1(re.posts,dom,tools);
		
		console.dir(re.posts);
	    },error:e=>{
		console.log("main.js>post:/post");
		console.dir(e);
	    }
	});
		       
		       
    })
    
})()


