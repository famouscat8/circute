
define(()=>{
    // 输入时间戳，返回人性化的时间显示
    function getDateDiff(dataTimeStamp){
	var result="";
	var minute= 1000 * 60;
	var hour  = minute * 60;
	var day   = hour * 24;
	var mouth = day * 30;
	var now   = new Date().getTime();
	var diffValue=now - dataTimeStamp;
	if(diffValue<0)return ;
	var mouthC=diffValue/mouth;
	var dayC=diffValue/day;
	var weekC=diffValue/(7*day)
	var hourC=diffValue/hour;
	var minC=diffValue/minute;
	if(mouthC>=1)result=""+parseInt(monthC)+"月前";
	else if(weekC>=1)result=""+parseInt(weekC)+"周前";
	else if(dayC>=1)result=""+parseInt(dayC)+"天前";
	else if(hourC>=1)result=""+parseInt(hourC)+"小时前";
	else if(minC>=1)result=""+parseInt(minC)+"分钟前";
	else result="刚刚";
	return result;
    };
    return {getDateDiff,}
})
