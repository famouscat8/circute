var substring=(string,len)=>{
    return string.replace(/\ +/g, "")
	.replace(/[ ]/g, "")
	.replace(/[\r\n]/g, "")
	.replace(/[\n]/g, "")
	.replace(/[\r]/g, "")
	.substring(0,len);
}


module.exports.substring = substring;
