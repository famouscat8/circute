const tencentcloud = require("tencentcloud-sdk-nodejs");
const NlpClient = tencentcloud.nlp.v20190408.Client;
const models = tencentcloud.nlp.v20190408.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential(
    "AKIDoOhjRKiKErPhiSsB6l8KFtGPIuGKp2bt",
    "HH2WikW3QZS7VcF9pTggQVO0MUK6KHxM"
);

let httpProfile = new HttpProfile();
httpProfile.endpoint = "nlp.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new NlpClient(cred, "ap-guangzhou", clientProfile);

var getSummar=(len, text)=>{
    return new Promise((resolve,reject)=>{
	let params = {Length:len,Text:text,};
	let req = new models.AutoSummarizationRequest();
	req.from_json_string(JSON.stringify(params));
	client.AutoSummarization(req,(err,response)=>{
	    if (err)reject(err)
	    resolve(response)
	})
    })
}



module.exports.getSummar = getSummar;
