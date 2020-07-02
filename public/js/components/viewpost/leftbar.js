// 帖子主控件头部作者信息显示

const _leftbar=document.createElement('template')

_mainheader.innerHTML=`
<div class="leftbar">
<div class="leftbar-star">
  <div class="leftbar-i-container">
    <i class="fa fa-thumbs-o-up"
  id="leftbar-i-star" aria-hidden="true"></i>
  </div>
  <p class="leftbar-star-p">0获赞</p>
</div>
<div class="leftbar-collect">
  <div class="leftbar-i-container">
    <i class="fa fa-bookmark-o"
id="leftbar-i-collect" aria-hidden="true"></i>
  </div>
  <p class="leftbar-collect-p">0收藏</p>
</div>
<div class="leftbar-comment">
  <div class="leftbar-i-container">
    <i class="fa fa-comments-o" aria-hidden="true"></i>
  </div>
  <p class="leftbar-comment-p">0评论</p>
</div>
</div>`;

class mButton extends HTMLElement{
    
}

var mleftBar=null;
class LeftBar extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_mainheader.content.cloneNode(true));
	mleftBar=this;
    }
    
    init(post,ajax,usermanager,tools,){
	mleftBar.setInfo(post,ajax,usermanager,tools);
	
	var leftbar_star=document
	    .getElementsByClassName('leftbar-star')[0];
	var leftbar_collect=document
	    .getElementsByClassName('leftbar-collect')[0];
	var leftbar_comment=document
	    .getElementsByClassName('leftbar-comment')[0];
	
	leftbar_star.onclick=()=>{
	    this.star(post,ajax,usermanager,tools);   
	}
	
	observer.subscribe('leftbar-isstar',(isstar)=>{
	    console.dir(isstar);
	    if(isstar){
		document
		    .getElementById('leftbar-i-star')
		    .className='fa fa-thumbs-up';
	    }else{
		document
		    .getElementById('leftbar-i-star')
		    .className='fa fa-thumbs-o-up';
	    }
	});
	observer.subscribe('leftbar-iscollect',(iscollect)=>{
	    if(iscollect)
		document
		.getElementById('leftbar-i-collect')
		.className="fa fa-bookmark";
	    else
		document
		.getElementById('leftbar-i-collect')
		.className="fa fa-bookmark-o";
	});
	observer.subscribe('leftbar-setstarnum',(starnum)=>{
	    document.getElementsByClassName('leftbar-star-p')[0]
		.innerText = starnum + ' 获赞';
	});
	observer.subscribe('leftbar-setcollectnum',collectnum=>{
	    document
		.getElementsByClassName('leftbar-collect-p')[0]
		.innerText = collectnum + ' 收藏';
	});
	
    }
    
    // 查询并设置帖子信息
    setInfo(post,ajax,usermanager,tools){
	function success(data){
	    if(data.state=='1'){
		observer.publish('leftbar-setstarnum',
				 data.starnum)
		    .publish('leftbar-setcollectnum',
			     data.collectnum)
		    .publish('leftbar-isstar',data.isstar)
		    .publish('leftbar-iscollect',data.iscollect);
		
		mleftBar._isstar = data.isstar;
		mleftBar._iscollect=data.iscollect;
	    }
	};
	
	var pd = JSON.stringify({
	    usertoken: usermanager.getToken(),
	    type     : post.type,
	    id       : post.aid||post.pid,
	    action   : 7,
	});
	
	ajax.post("/setpost",pd,success,e=>{
	    console.dir(e);
	});
    }

    //点赞
    star(post,ajax,usermanager,tools){
	//判断当前是点赞还是取消点赞
	var isToStar=this._isstar;
	var action=null;
	isToStar ? action=5:action=1;
	var pd=JSON.stringify({
	    usertoken : usermanager.getToken(),
	    id        : post.aid|post.pid,
	    type      : post.type,
	    action    : action,
	});
	
	observer.publish('leftbar-isstar',
			 this._isstar=!this._isstar);
	var success = data=>{
	    if(data.state=='-1'){
		observer.publish('leftbar-isstar',
				 mleftBar._isstar =
				 !mleftBar._isstar)
	    }
	}
	function error(e){
	    console.dir(e);
	    observer.publish('leftbar-isstar',
			     mleftBar._isstar =
			     !mleftBar._isstar)
	};
	ajax.post('/setpost',pd,success,error);
    }

    // _review(isstar=mleftBar._isstar,
    // 	    iscollect=mleftBar._iscollect){
    
    // 	if(Boolean(isstar))document
    // 	    .getElementById('leftbar-i-star')
    // 	    .className='fa fa-thumbs-up';
    // 	else document
    // 	    .getElementById('leftbar-i-star')
    // 	    .className='fa fa-thumbs-o-up';
    // 	if(Boolean(iscollect))document
    // 	    .getElementById('leftbar-i-collect')
    // 	    .className="fa fa-bookmark";
    // 	else document
    // 	    .getElementById('leftbar-i-collect')
    // 	    .className="fa fa-bookmark-o";

    // }
}

window.customElements.define('left-bar',LeftBar);
