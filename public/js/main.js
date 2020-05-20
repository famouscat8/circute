// index.html 的 js
(function (){
    requirejs.config({
	baseUrl: "js/",
	paths: {
	    "alerter": "modules/alerter",
	    "dataService": "modules/dataService",
	    "firstpage": "modules/firstpage/firstpage",
	    "signup": "modules/signup",
	    "jquery": "libs/jquery",
	    "layer": "libs/layer/layer",
	    "u_manager": "modules/tools/user",
	}
    })
    // 初始化界面
    requirejs(["jquery", "signup","layer","u_manager"],
	      ($,signup,layer,u_m)=>{
		  // 判断用户token是否有效
		  var token=u_m.getToken();
		  console.log("token:"+token);
		  u_m.verifyToken(token,$).then(r=>{
		      $(".btn-login").fadeOut();
		      $(".btn-signup").fadeOut();
		      $(".user").fadeIn();
		      var user=u_m.getUser();
		      $(".username").text(user.nickname);
		      $(".useravatar").attr("src",
					    user.avatarurl);
		      $(".user-cover-username")
			  .text(user.nickname);
		      $(".user-cover-header")
			  .css("background-image",
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
		  $(".btn-tools-wenku").click(()=>{
		      //		      location.
//		      layer.msg("udihsua");
		  })

	      })
    
})()


