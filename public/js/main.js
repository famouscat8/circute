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
	}
    })
    var deps = ["jquery", "signup","layer",
		"u_manager","dom","localdb"];
    // 初始化界面(首页初始化)
    requirejs(deps,($,signup,layer,u_m,dom,localdb)=>{
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
	// window.history.go();
	// window.history.back();
	// window.history.forward();
	
	// 模拟数据
	var data = [
	    {
		post_img:"https://s1.ax1x.com/2020/05/21/Yqlgp9.jpg",
		post_title:"量子计算机新突破，量子计算机离我们还有多远?",
		post_username:"澎湃新闻",
		post_time:"10分钟前",
		post_sort:"量子计算机伴随量子技术而出现，不论是美国还是我们国家，都在不断地探索量子计算机地新发展。可以预见......"
	    },{
		post_img:"https://s1.ax1x.com/2020/05/21/Yq1lcR.jpg",
		post_title:"登封测极|因天气原因，珠峰高程测量登山队决定回撤休整",
		post_username:"famouscat",
		post_time:"1小时前",
		post_sort:"5月21h日上午，珠穆朗玛峰大本营......"
	    },{
		post_img:"https://s1.ax1x.com/2020/05/21/Yqlgp9.jpg",
		post_title:"量子计算机新突破，量子计算机离我们还有多远?",
		post_username:"澎湃新闻",
		post_time:"10分钟前",
		post_sort:"量子计算机伴随量子技术而出现，不论是美国还是我们国家，都在不断地探索量子计算机地新发展。可以预见......"
	    }];
	
	var card_main=
	    document.getElementsByClassName("card-main")[0];
	
	for(var i=0;i<data.length;i++){
	    // 以下创建父容器
	    var main=dom.div("list-items");
	    //main.style.background="#"+i*2+"f0000";
	    card_main.appendChild(main);
	    
	    // 创建左边图片容器 list-items-container
	    var imgcontainer=dom.div("list-items-conner");
	    var img=dom.img("list-items-img");
	    imgcontainer.appendChild(img);
	    main.appendChild(imgcontainer);
	    
	    // 右边帖子信息
	    var postcent=dom.div("list-items-content");
	    // postcent.style.background="#ffff00";
	    main.appendChild(postcent);
	    var title=dom.p("list-items-title");
	    //title.innerHTML="[&nbsp;精品&nbsp;]&nbsp;TITLE For My TEST";
	    postcent.appendChild(title);
	    var sort=dom.p("list-items-post");
	    postcent.appendChild(sort);
	    var user=dom.div("list-items-user");
	    postcent.appendChild(user);
	    var username=dom.p("list-items-username");
	    //username.innerText="famouscat";
	    user.appendChild(username);
	    var postime=dom.p("list-items-postime");
	    user.appendChild(postime);
	    var line=
		dom.p("hr-list-items b-m-top-05rem b-m-bottom-1rem");
	    card_main.appendChild(line);
	    
	    img.src=data[i].post_img;                           
	    title.innerText=data[i].post_title;                                   
	    sort.innerText=data[i].post_sort;
	    username.innerText=data[i].post_username;                                 
	    postime.innerHTML="&nbsp;&bull;&nbsp;"+data[i].post_time;

	}
    })
    
})()


