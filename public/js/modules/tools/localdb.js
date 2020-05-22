// 操作localStorage
define(()=>{
    function isExsist(key){
	if(localStorage.getItem(key))return true; 
	return false;
    }
    function setItem(key, data){
	return new Promise((resolve,reject)=>{
	    if(key&&data){
		localStorage.setItem(key,data+"");
		resolve({state:"1",e:null});
	    }
	    reject(
		{state:"-1",e:"key or data can not be null"});
	})
    }
    function getItem(key){
	let t_data=localStorage.getItem(key);
	return t_data;
    }
    return {
	setItem,getItem,isExsist,
    }
})
