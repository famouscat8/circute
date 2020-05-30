// 网络请求类 基于jquery

class MyAjax {
    constructor(){}
    
    // @param url: the url to request
    //        data: the data post to server;
    //        success: callback when post sucess;
    post(url,data,success,error){
	$.ajax({
	    type:"POST",
	    contentType:"application/json;charset=UTF-8",
	    url:url,
	    data: data,
	    success:r=>{success(r)},
	    error:e=>{error(e)},
	});
    }
}
