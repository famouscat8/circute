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
	}
    })
    var deps = ["jquery", "signup","layer","u_manager","dom"];
    // 初始化界面(首页初始化)
    requirejs(deps,($,signup,layer,u_m,dom)=>{
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
	
	// 模拟数据
	var data = {};
	
	var card_main=
	    document.getElementsByClassName("card-main")[0];
	
	for(var i=0;i<1;i++){
	    // 以下创建父容器
	    var main=dom.div("list-items");
	    //main.style.background="#"+i*2+"f0000";
	    card_main.appendChild(main);
	    
	    // 创建左边图片容器 list-items-container
	    var imgcontainer=dom.div("list-items-conner");
	    var img=dom.img("list-items-img");
	    img.src=
		"https://s1.ax1x.com/2020/05/21/YbWVaT.jpg";
	    img.style.height="150px";
	    img.style.width="150px";
	    imgcontainer.appendChild(img);
	    main.appendChild(imgcontainer);
	    
	    // 右边帖子信息
	    var postcent=dom.div("list-items-content");
	    postcent.style.height="150px";
	    postcent.style.width="150px";
	    // postcent.style.background="#ffff00";
	    main.appendChild(postcent);
	    var title=dom.p("list-items-title");
	    title.innerHTML="&nbsp;[&nbsp;精品&nbsp;]&nbsp;TITLE For My TEST";
	    postcent.appendChild(title);
	    var sort=dom.p("list-items-post");
	    sort.innerText="just for my test! ohhhhhhhhhhh";
	    postcent.appendChild(sort);
	    var user=dom.div("list-items-user");
	    postcent.appendChild(user);
	    var username=dom.p("list-items-username");
	    username.innerText="famouscat";
	    user.appendChild(username);
	    var postime=dom.p("list-items-postime");
	    postime.innerHTML="&nbsp;&bull;&nbsp;"+"10min ago";
	    user.appendChild(postime);
	    
	}
    })
    
})()


