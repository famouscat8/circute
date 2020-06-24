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
    //         callback:
    // callback the function after upload complete;
    //         progree :
    // return progress of upload prosession.
    // options{uid:userid}
    putObject(object,options,callback,p){
	var time = new Date().getTime();
	var configs    = {
	    Bucket     : this.Bucket,
	    Region     : this.Region,
	    Key        : "user:"+options.uid+
		":files/"+object.name + "_"+time,
	    Body       : object,
	    onProgress : data=>{p(data)},
	};
	super.putObject(configs,
			(err,data)=>{callback(err,data)});
    }
    
    getObjectUrl(object_name,callback){
	var configs    = {
	    Bucket     : this.Bucket,
	    Region     : this.Region,
	    Key        : object_name,
	    Sign       : false,
	};
	super.getObjectUrl(configs,(err,data)=>{callback(err,data)});
    }

    //确认该储存桶是否存在
    // 存在有读取权限： data.statusCode||data.statusCode==200
    // 存在无读取权限：403
    //不存在：404
    headBucket(bucket,region,callback){
	var options = {
	    Bucket:bucket,
	    Region:region,
	};
	
	super.headBucket(options,(err,data)=>{callback(err,data)});
    }
}


