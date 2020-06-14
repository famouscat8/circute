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
<i class="fa fa-plus" aria-hidden="true"
   id="main-user-follow-icon"></i>
 <p id="main-user-follow-p">关注</p></button>
<button class="main-user-chart">
<i class="fa fa-comments-o" aria-hidden="true"
 id="main-user-chart-icon"></i>
<p id="main-user-chart-p">私信</p></button>
</div></div>`;

var mviewUser=null;
class ViewpostUser extends HTMLElement{
    constructor(){
	super();
	this.appendChild(tem2.content.cloneNode(true));
	mviewUser=this;
	// 登录用户和作者的关系
	this.user_relation=null;
	
    }
    
    //取消关注当前用户
    unfollow_user(user,ajax,usermanager,su,er){
	var pd={
	    usertoken:usermanager.getToken(),
	    other:user.uid,
	    time: new Date().getTime(),
	    action:2,
	};
	pd=JSON.stringify(pd);
	function success(data){
	    if(data.state=="-1")er(data.e);
	    if(data.state=="1")mviewUser.user_relation=null;
	};
	function error(e){
	    console.dir(e);
	    er(e);
	};
	ajax.post("/fans",pd,success,error);
    }
    
    // 关注当前用户
    follow_user(user,ajax,usermanager,su,er){
	var pd={
	    usertoken: usermanager.getToken(),
	    other: user.uid,
	    time: new Date().getTime(),
	    action:1,
	}
	pd=JSON.stringify(pd);
	function success(data){
	    if(data.state=="-1")er(data.e);
	    if(data.state=='1')mviewUser.user_relation=1;
	};
	function error(e){
	    console.dir(e);
	    er(e);
	};
	ajax.post('/fans',pd,success,error);
    }
    
    init(user,ajax,usermanager,tools){
	console.dir(user);
	if(!Boolean(user))return;
	var avatar=document
	    .getElementsByClassName('main-user-avatar')[0];
	avatar.src=user.avatarurl;
	var username=document
	    .getElementsByClassName('main-user-username')[0];
	username.innerText=user.nickname;
	var follow=document
	    .getElementsByClassName('main-user-follow')[0];
	var follow_icon=document
	    .getElementById('main-user-follow-icon');
	var follow_text=document
	    .getElementById('main-user-follow-p');
	follow.onclick=()=>{
	    var relation=mviewUser.user_relation;
	    if(relation==1||relation==3){//已关注,点击取消关注
		mviewUser.disfollowed();
		mviewUser
		    .unfollow_user(user,ajax,usermanager,null,e=>{
			mviewUser.followed();
		    });
	    }else{//未关注,点击关注
		mviewUser.followed();
		mviewUser.follow_user(user,ajax,usermanager,null,e=>{
		    mviewUser.disfollowed();
		});
	    }
	}
	
	var pd={
	    usertoken: usermanager.getToken(),
	    other: user.uid,
	    time: new Date().getTime(),
	    action:7,
	}//判断两人关系
	pd=JSON.stringify(pd);
	ajax.post('/fans',pd,data=>{
	    if(data.state=='-1')
		console.dir(data);
	    else if(data.relation==1||data.relation==3){
		mviewUser.user_relation=data.relation;
		mviewUser.followed();
	    }
	},e=>{
	    console.dir(e);
	})
    }

    followed(){
	var follow=document
	    .getElementsByClassName('main-user-follow')[0];
	var follow_icon=document
	    .getElementById('main-user-follow-icon');
	var follow_text=document
	    .getElementById('main-user-follow-p');
	follow.className=
	    'main-user-follow main-user-follow-btn-active';
	follow_text.innerText="已关注";
	follow_icon.className="fa fa-check";
    }
    disfollowed(){
	var follow=document
	    .getElementsByClassName('main-user-follow')[0];
	var follow_icon=document
	    .getElementById('main-user-follow-icon');
	var follow_text=document
	    .getElementById('main-user-follow-p');
	follow.className='main-user-follow';
	follow_icon.className='fa fa-plus';
	follow_text.innerText='关注';
    }
}

window.customElements.define('viewpost-user', ViewpostUser);
