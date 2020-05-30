// index.html 的 js

$(".btn-tools-wenku").click(()=>{});

// 将标题临时保存在localStorage:spost_title
$(".startfunny-start").click(()=>{
    var title=$(".startfunny-title").val();
    let localdb = new LocalDB();
    localdb.setItem("spost_title",title).then(r=>{
	layer.msg("标题已保存");
	var url=location.href+"post.html";
	// 新标签打开编辑帖子界面
	window.open(url);
    }).catch(e=>{
	layer.msg("标题保存失败:" +e.e)
    });
});

// 从服务器获取帖子
$.ajax({
    type:"POST",
    contentType:"application/json;charset=UTF-8",
    url:"/post",
    data:JSON.stringify({page:1,pagesize:10,}),
    success:re=>{
	console.dir(re);
	if(re.state=="1"){
	    var vt   = new ViewTools();
	    var tools= new Tools();
	    var dom  = new Dom();
	    vt.item1(re.posts,dom,tools,$);
	    // 隐藏加载提示
	    $(".loading").fadeOut();
	}
    },error:e=>{
	console.log("main.js>post:/post: error");
	console.dir(e);
    }
});

