// 对腾讯云对象封装
// 继承自tenxuncos.min.js: COS
class MyCOS extends COS{
    
    constructor(tmpkeys){
	super({
	    getAuthorization: (options,call)=>{
		call({
		    TmpSecretKey:tmpkeys.credentials.tmpSecretKey,
		    TmpSecretId:tmpkeys.credentials.tmpSecretId,
		    XCosSecurityToken:
		    tmpkeys.credentials.sessionToken,
		    StartTime:tmpkeys.startTime,
		    ExpiredTime:tmpkeys.expiredTime,
		});
	    }
	});
	this.Bucket   = "circute2-1259491699";
	this.Region   = "ap-beijing";
    }
    
    // 重写putObject
    // @param: object  : the object to upload
    //         callback: callback the function after upload complete;
    //         progree : return progress of upload prosession.
    putObject(object,callback,p){
	var configs    = {
	    Bucket     : this.Bucket,
	    Region     : this.Region,
	    Key        : object.name,
	    Body       : object,
	    onProgress : data=>{p(data)},
	};
	super.putObject(configs,(err,data)=>{callback(err,data)});
    }
    
    getObjectUrl(object_name,callback){
	var configs    = {
	    Bucket     : this.Bucket,
	    Region     : this.Region,
	    Key        : object_name,
	    Sign       : false,
	};
	super.getObjectUrl(configs, (err,data)=>{callback(err,data)});
    }
        
}


    // function test (tmpkeys,file,callback){
    // 	var cos=new COS({
    // 	    getAuthorization:(options,call)=>{
    // 		call({
    // 		    TmpSecretKey:tmpkeys.credentials.tmpSecretKey,
    // 		    TmpSecretId:tmpkeys.credentials.tmpSecretId,
    // 		    XCosSecurityToken:
    // 		    tmpkeys.credentials.sessionToken,
    // 		    StartTime:tmpkeys.startTime,
    // 		    ExpiredTime:tmpkeys.expiredTime,
    // 		});
    // 	    }
    // 	});
	
    // 	var Bucket="circute2-1259491699";
    // 	var Region="ap-beijing";
    // 	cos.putObject({
    // 	    Bucket:Bucket,
    // 	    Region:Region,
    // 	    Key:file.name+"",
    // 	    Body:file,
    // 	    onProgress:progressData=>{
    // 		layer.msg(JSON.stringify(progressData));
    // 	    }
    // 	},(err,data)=>{
    // 	    if(err) layer.msg(JSON.stringify(err));
    // 	    console.dir(data);
    // 	    if(!err)
    // 		cos.getObjectUrl({
    // 		    Bucket:Bucket,
    // 		    Region:Region,
    // 		    Key:file.name+"",
    // 		    Sign:false,
    // 		},(err,data)=>{
    // 		    if(err)layer.msg(JSON.stringify(err));
    // 		    console.dir(data);
    // 		    if(!err){
    // 			if(imgs.length<1);
    // 			imgs.push(data.Url);
    // 			callback(data.Url);
    // 		    }
    // 		})
    // 	})
    // }
