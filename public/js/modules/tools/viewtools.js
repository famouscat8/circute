define(()=>{
    function item1(posts,dom,tools,$){
	var card_main=document.
	    getElementsByClassName("card-main")[0];
	for(var i=0;i<posts.length;i++){
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
	    //img.src=posts[i].post_img;                           
	    console.dir(posts);
	    title.innerText=posts[i].content.title;
            title.href=
		location.href+"viewpost.html?pid="+posts[i].pid;     
	    sort.innerText=posts[i].content.content;
	    username.innerText=posts[i].owner.username;
	    postime.innerHTML="&nbsp;&bull;&nbsp;"+
		tools.getDateDiff(posts[i].time);
	    

	}

	
    };
    return {
	item1,
    }
})
