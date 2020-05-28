class Dom {
    constructor(){}
    
    // input class name and return li
    li(c_name){
	var a=document.createElement("li");
	a.className=c_name;
	return a;
    }
    img(c_name){
	var a=document.createElement("img");
	a.className=c_name;
	return a;
    }

     h1(c_name){
	var a=document.createElement("h1");
	a.className=c_name;
	return a;
    }
     a(c_name){
	var a=document.createElement("a");
	a.className=c_name;
	return a;
    }

     p(c_name){
	var a=document.createElement("p");
	a.className=c_name;
	return a;
    }

     span(c_name){
	var a=document.createElement("span");
	a.className=c_name;
	return a;
    }
     div(c_name){
	var a=document.createElement("div");
	a.className=c_name;
	return a;
    }

}
