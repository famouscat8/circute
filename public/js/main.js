// index.html 的 js

$(()=>{
    var ajax = new MyAjax();

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




