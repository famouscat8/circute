var qiniu = require("qiniu");


var ak = "vR9swnFpH08vxfpwXjnSYSGNLQvvCa06GrFadKUr";
var sk = "r_SuVkJBJYtUztquUT3ktkE-3gpXvLOpXRnGZa0e";
var mac = new qiniu.auth.digest.Mac(ak, sk);
var options = {
    scope: "circute",
};

var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

console.log("uploadToken:"+uploadToken);


var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;

var localFile = "/root/test/web/public/images/bg1.jpg";

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key = "test.jpg";

formUploader.putFile(uploadToken, key, localFile, putExtra,
		     (respErr, respBody, respInfo)=>{
			 if(respErr)throw respErr;
			 if(respInfo.statusCode==200)
			     console.log(respBody);
			 else
			     console.log(
				 respInfo.statusCode
				 +"\n\n"+respBody
			     );
		     });



