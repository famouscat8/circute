$(()=>{
    var usermanager= new UserManager();
    var tools=new Tools();
    var ajax=new MyAjax();

    var show=content=>{
	var testeditor = editormd.markdownToHTML("test-editormd",{
	    markdown: content,
	    emoji: true,
	    taskList:true,
	    tex:true,
	    sequenceDiagram:true,
	});
    }

    
    function success(data){
	console.dir(data);
	if(data.state=="1"){
	    var post=data.post;
	    var artical=data.artical;	    
	    if(Boolean(post)){//post
		document.title=post.content.title;
		show(post.content.content);
		mviewUser.init(post.owner,ajax,usermanager,tools);
		mmainHeader.init(post.owner);
	    }else{//artical
		document.title=artical.title;
		show(artical.content);
		mviewUser.init(artical.owner,ajax,usermanager,tools);
		mmainHeader.init(artical.owner);
		mleftBar.init(artical,ajax,usermanager,tools);
	    }
	}else{
	    console.log('加载失败');
	}
    };
    
    function error(e){
	console.dir(e);
    };
    
    var pd={
	aid:tools.getUrlParam("aid"),
	pid:tools.getUrlParam('pid'),
    };
    pd=JSON.stringify(pd);
    ajax.post('/getpost',pd,success,error);
    
})

