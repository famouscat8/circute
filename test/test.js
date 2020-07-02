var observer = {
    subscribes: [],
    subscribe: function(type,fn){
	if(!this.subscribes[type]){
	    this.subscribes[type] = [];
	}
	
	typeof fn === 'function'&&this.subscribes[type].push(fn);
	console.dir(this.subscribes);
    },
    publish: function(){
	var type = [].shift.call(arguments);
	var fns  = this.subscribes[type];
	console.dir(['this:',this]);
	console.dir(['fns:',fns]);
	console.dir(['arguments:',arguments['0']]);
	if(!fns || !fns.length){
	    return;
	}
	
	for(var i=0;i<fns.length;i++){
	    fns[i].apply(this,arguments);
	}
    }
}

observer.subscribe('job',function(type){
    console.log(type);
})

observer.subscribe('job',function(type2){
    console.log(type2);
})
observer.subscribe('exam',function(score){
    console.log(score);
})

observer.publish('job',['haha','jhaha']);
observer.publish('exam',98);
