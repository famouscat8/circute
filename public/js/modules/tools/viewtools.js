// 渲染界面类
class ViewTools {
    constructor(){}

    // 渲染帖子
    // @param: post_data
    // @param: dom: create view
    // @param: tools: can return new time
    item1(post_data,dom,tools,$){
	var card_main=document.
	    getElementsByClassName("card-main")[0];
	for(var i=0;i<post_data.length;i++){
	    // 以下创建父容器
	    var main=dom.div("list-items");
	    card_main.appendChild(main);
	    // 创建左边图片容器 list-items-container
	    var imgcontainer=dom.div("list-items-conner");
	    var img=dom.img("list-items-img");
	    imgcontainer.appendChild(img);
	    main.appendChild(imgcontainer);
	    // 右边帖子信息
	    var postcent=dom.div("list-items-content");
	    main.appendChild(postcent);
	    var title=dom.a("list-items-title");
	    postcent.appendChild(title);
	    var sort=dom.a("list-items-post");
	    postcent.appendChild(sort);
	    var user=dom.div("list-items-user");
	    postcent.appendChild(user);
	    var username=dom.p("list-items-username");
	    user.appendChild(username);
	    var postime=dom.p("list-items-postime");
	    user.appendChild(postime);
	    var line=dom.
		p("hr-list-items b-m-top-05rem b-m-bottom-1rem");
	    
	    card_main.appendChild(line);
	    if(post_data[i].imgs){
		var imgsArray=JSON.parse(post_data[i].imgs);
		img.src=imgsArray[0];
		img.onerror=()=>{
		    var img= event.srcElement;
		    img.src=
			"https://s1.ax1x.com/2020/06/02/tN6ZJx.jpg";
		    img.onerror=null;
		}
	    }
	    title.innerText=post_data[i].content.title;
	    
            title.href=location.href+
		"viewpost.html?pid="+post_data[i].pid;     
	    sort.innerText=post_data[i].content.content;
	    username.innerText=post_data[i].owner.username;
	    postime.innerHTML="&nbsp;&bull;&nbsp;"+
		tools.getDateDiff(post_data[i].time);
	    
	}
    }
}
