// index.html 的 js

$(()=>{
    var ajax = new MyAjax();
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

    // 从后端获取帖子成功后调用显示帖子数据
    function init(posts){
	var tools= new Tools();
	var dom  = new Dom();
	mMainList.init(posts,tools,$);
	mArtPost.init(posts);
	console.log("diasuhdfsuiahb");
    }
    
    function success(data){
	console.dir(data);
	if(data.state=="1")
	    init(data.posts);
	else console.log("main.js-->get post data error");
    }
    function error(e){
	console.dir(e);
    }

    var post_data = {page:1,pagesize:10}
    ajax.post("/post",JSON.stringify(post_data),success,error);
        
})




