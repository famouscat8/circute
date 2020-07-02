// 观察者模式
var observer = {
    subscribes: [],
    subscribe: function(type,fn){
	if(!this.subscribes[type]){
	    this.subscribes[type] = [];
	}
	typeof fn === 'function'&&this.subscribes[type].push(fn);
	return this;
    },
    publish: function(){
	var type = [].shift.call(arguments);
	var fns  = this.subscribes[type];
	if(!fns || !fns.length){
	    return;
	}
	for(var i=0;i<fns.length;i++){
	    fns[i].apply(this,arguments);
	}
	return this;
    }
}
