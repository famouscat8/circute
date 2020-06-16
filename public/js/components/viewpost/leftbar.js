// 帖子主控件头部作者信息显示

const _leftbar=document.createElement('template')

_mainheader.innerHTML=`
<div class="leftbar">
<div class="leftbar-star">
  <div class="leftbar-i-container">
    <i class="fa fa-thumbs-o-up"
  id="leftbar-i-star" aria-hidden="true"></i>
  </div>
  <p class="leftbar-star-p">--- 获赞</p>
</div>
<div class="leftbar-collect">
  <div class="leftbar-i-container">
    <i class="fa fa-bookmark-o"
id="leftbar-i-collect" aria-hidden="true"></i>
  </div>
  <p class="leftbar-collect-p">--- 收藏</p>
</div>
<div class="leftbar-comment">
  <div class="leftbar-i-container">
    <i class="fa fa-comments-o" aria-hidden="true"></i>
  </div>
  <p class="leftbar-comment-p">--- 评论</p>
</div>
</div>`;

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
	    mleftBar.star(post,ajax,usermanager,tools);   
	}
	
    }

    // 查询并设置帖子信息
    setInfo(post,ajax,usermanager,tools){
	function success(data){
	    console.dir(data);
	    if(data.state=='1'){
		var star = document
		    .getElementsByClassName('leftbar-star-p')[0];
		star.innerText=data.starnum+' 获赞';
		var collect = document
		    .getElementsByClassName('leftbar-collect-p')[0];
		collect.innerText=data.collectnum+' 收藏';
		mleftBar._isstar=data.isstar;
		mleftBar._iscollect=data.iscollect;
		mleftBar._review();
	    }
	};
	function error(e){
	    console.dir(e);
	};

	var pd={
	    usertoken:usermanager.getToken(),
	    type:post.type,
	    id:post.aid|post.pid,
	    action: 7,
	}
	pd=JSON.stringify(pd);
	ajax.post("/setpost",pd,success,error);
    }


    //点赞
    star(post,ajax,usermanager,tools){
	console.dir([mleftBar._isstar,mleftBar._iscollect]);
	var isToStar=mleftBar._isstar;//判断当前是点赞还是取消点赞
	var action=null;
	if(isToStar==true){
	    action=5;
	}else{
	    action=1;
	}
	var pd=JSON.stringify({
	    usertoken:usermanager.getToken(),
	    id:post.aid|post.pid,
	    type:post.type,
	    action: action,
	});
	mleftBar._isstar=!mleftBar._isstar;
	mleftBar._review();
	function success(data){
	    console.dir(data);
	    if(data.state=='-1'){
		mleftBar._isstar=!mleftBar._isstar;
		mleftBar._review();
	    }
	};
	function error(e){
	    console.dir(e);
	    mleftBar._isstar=!mleftBar._isstar;
	    mleftBar._review();
	};
	ajax.post('/setpost',pd,success,error);
    }

    _review(isstar=mleftBar._isstar,iscollect=mleftBar._iscollect){
	if(Boolean(isstar))document
	    .getElementById('leftbar-i-star')
	    .className='fa fa-thumbs-up';
	else document
	    .getElementById('leftbar-i-star')
	    .className='fa fa-thumbs-o-up';
	if(Boolean(iscollect))document
	    .getElementById('leftbar-i-collect')
	    .className="fa fa-bookmark";
	else document
	    .getElementById('leftbar-i-collect')
	    .className="fa fa-bookmark-o";

    }
}

window.customElements.define('left-bar',LeftBar);
