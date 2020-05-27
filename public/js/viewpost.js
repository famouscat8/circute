$(()=>{

    var show=post_data=>{
	var testeditor = editormd.markdownToHTML("test-editormd",{
	    markdown: post_data,
	    emoji: true,
	    taskList:true,
	    tex:true,
	    sequenceDiagram:true,
	});
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
	    document.title=r.post.content.title;
	    show(r.post.content.content);
	},error:e=>{
	    show(JSON.stringify(e));
	}
    })
    
})


