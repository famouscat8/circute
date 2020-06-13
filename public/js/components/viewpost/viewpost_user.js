const tem2 = document.createElement('template');
tem2.innerHTML=`
<div class="main-user-message">
<div class="main-user-avatar-container">
  <img class="main-user-avatar"/>
<p class="main-user-username">CIRCUTE</p>
</div>
<div class="main-user-message-container">
  <div class="main-user-articalnum-container">
    <div class="main-user-fa-book-container">
      <i class="fa fa-book" aria-hidden="true"></i>
    </div>
    <p class="main-user-articalnum">--篇文章</p>
  </div>
  <div class="main-user-thumbsup-container">
    <div class="main-user-fa-thumbsup-container">
      <i class="fa fa-thumbs-up" aria-hidden="true"></i>
    </div>
    <p class="main-user-thumbsupnum">----赞</p>
  </div>
  <div class="main-user-star-container">
    <div class="main-user-fa-star-container">
      <i class="fa fa-star" aria-hidden="true"></i>
    </div>
    <p class="main-user-starnum">----收藏</p>
  </div>
</div>
<div class="main-user-footer-container">
<button class="main-user-follow">
<i class="fa fa-plus" aria-hidden="true"></i>关注</button>
<button class="main-user-chart">
<i class="fa fa-comments-o" aria-hidden="true"></i>私信</button>
</div></div>`;

var mviewUser=null;
class ViewpostUser extends HTMLElement{
    constructor(){
	super();
	this.appendChild(tem2.content.cloneNode(true));
	mviewUser=this;
    }
    
    init(user){
	console.dir(user);
	if(!Boolean(user))return;
	var avatar=document
	    .getElementsByClassName('main-user-avatar')[0];
	avatar.src=user.avatarurl;
	var username=document
	    .getElementsByClassName('main-user-username')[0];
	username.innerText=user.nickname;
    }
}

window.customElements.define('viewpost-user', ViewpostUser);
