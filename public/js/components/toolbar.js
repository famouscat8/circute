const tem = document.createElement('template');

tem.innerHTML=`<header>
      <a href='' class="logo">CIRCUTE</a>
      <div class="logo-rightside">
	<ul class="links">
	  <li><a href="/">首页</a></li>
	  <li><a href="szupowermanager.html"
		 class="btn-more-tools">Power Manager</a></li>
          <li><a href="buble.html">泡泡茶壶</a></li>
	</ul>

<div class="search-container">
    <input type="text"
	   class="search-input"
	   placeholder="Type to search"/>
    <button class="search-button">搜索</button>
</div>

<div class="toolbar-bell">
<i class="fa fa-bell" aria-hidden="true"></i>
</div>
	<div class="login">
	  <a href="login.html"
	     class="btn-login">log in</a>
	  <a href="signup.html"
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
		<a href="user.html"
		   class="btn-settings">
               <i class="fa fa-cog" aria-hidden="true"></i>
		  个人设置</a>
		<a href="javascript:void(0);"
		   class="btn-logout">
               <i class="fa fa-sign-out" aria-hidden="true"></i>
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
	    var user=userManager.getUser();
	    $(".btn-login").fadeOut();
	    $(".btn-signup").fadeOut();
	    $(".user").fadeIn();
	    $(".username").text(user.nickname);
	    $(".useravatar").attr("src",user.avatarurl);
	    $(".user-cover-username").text(user.nickname);
	    $(".user-cover-header")
		.css("background-image","url("+user.uimg+")");
	    $(".btn-logout").click(()=>{
		if(userManager.delUM()==1)location.reload();
	    });
	    $(".btn-settings").click(()=>{
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
