var COS=require("cos-nodejs-sdk-v5");

var cos=new COS({
    SecretId:"AKIDoOhjRKiKErPhiSsB6l8KFtGPIuGKp2bt",
    SecretKey:"HH2WikW3QZS7VcF9pTggQVO0MUK6KHxM",
});

cos.getService((err,data)=>{
    console.dir(err);
    console.dir(data);
    console.log(data && data.Buckets);
})
