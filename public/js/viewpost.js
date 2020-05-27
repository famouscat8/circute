$(()=>{


    // 错误处理函数
    var errorshow=error=>{
	
    }
    
    // 处理用户信息
    var avatar=avatar_data=>{
	$(".avatar").attr("src",avatar_data.avatarurl);
	$(".username").html(avatar_data.nickname);
	$(".user").attr("background",avatar_data.uimg);
    };
    
    var show=post_data=>{
	var testeditor = editormd.markdownToHTML("test-editormd",{
	    markdown: post_data,
	    emoji: true,
	    taskList:true,
	    tex:true,
	    sequenceDiagram:true,
	});
    }

    // 显示帖子信息
    var post_message=post_data=>{
	$(".message").text("time: "+ post_data.time+
			   "  star:"+ post_data.star);
    }

    var getUrlParam=name=>{
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.slice(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
    }
    
    $.ajax({
	type:"POST",
	url:"/getpost",
	contentType:"application/json;charset=UTF-8",
	data:JSON.stringify({pid:getUrlParam("pid")}),
	success:r=>{
	    if(r.state=="-1"){
		errorshow(r.e);
		return;
	    }
	    
	    document.title=r.post.content.title;
	    show(r.post.content.content);
	    avatar(r.post.owner);
	    post_message(r.post);
	    console.dir(r);
	},error:e=>{
	    errorshow(e);
	}
    })
    
})


