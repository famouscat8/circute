// 返回uploadtoken 和downloadtoken

var qiniu = require("qiniu");

//返回上传token


var ak = "vR9swnFpH08vxfpwXjnSYSGNLQvvCa06GrFadKUr";
var sk = "r_SuVkJBJYtUztquUT3ktkE-3gpXvLOpXRnGZa0e";

var t_options = {
    scope: "circute",
};

function uploadToken(options=t_options){
    console.log("uploadToken:"+uploadToken);
    var mac = new qiniu.auth.digest.Mac(ak, sk);
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}

function downloadToken(options=t_options){
    return "haha";
}

module.exports = {
    uploadToken,
    downloadToken,
}
