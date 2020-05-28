const tem = document.createElement('template');
tem.innerHTML=`<header>
      <a href='' class="logo">CIRCUTE</a>
      <div class="logo-rightside">
	<ul class="links">
	  <li><a href="">首页</a></li>

	  <li><a href="wenku.html"
		 class="btn-tools-wenku">百度文库下载</a></li>
	  <li><a href=""
		 class="btn-more-tools">小工具</a></li>
	</ul>
	<div class="login">
	  <a href="login.html"
	     class="btn-login">log in</a>
	  <a href="javascript:void(0);"
	     class="btn-signup">sign up</a>
	  <div class="user">
	    <p class="username"></p>
	    <img src="images/test.ico"
		 alt="useravatar"
		 class="useravatar"/>
	    <div class="user-cover">
	      <div class="user-cover-header">
		<p class="user-cover-username"></p>
	      </div>
	      <div class="user-cover-footer">
		<a href="javascript:void(0);"
		   class="btn-settings">
		  个人设置</a>
		<a href="javascript:void(0);"
		   class="btn-logout">
		  退出登录</a>
	      </div>
	    </div>
	  </div>
	</div>
      </div>
    </header>`;

class ToolBar extends HTMLElement{
    constructor(){
	super();
	this.appendChild(tem.content.cloneNode(true));
	var userManager = new UserManager();
	var token       = userManager.getToken();

	
	userManager.verifyToken(token,$).then(data=>{
	    var user=getUser();
	    $(".btn-login").fadeOut();
	    $(".btn-signup").fadeOut();
	    $(".user").fadeIn();
	    $(".username").text(user.nickname);
	    $(".useravatar").attr("src",user.avatarurl);
	    $(".user-cover-username").text(user.nickname);
	    $(".user-cover-header")
		.css("background-image","url("+user.uimg+")");
	    $(".btn-logout").click(()=>{
		if(delUM()==1)location.reload();
	    });
	    $(".btn-settings").click(()=>{
		layer.msg("个人中心");
	    });
	    
	}).catch(e=>{
	    console.log("error");
	    console.dir(e);
	    $(".btn-login").fadeIn();
	    $(".btn-signup").fadeIn();
	    $(".user").fadeOut();

	});
	
    
    }
}

    window.customElements.define('tool-bar', ToolBar);

