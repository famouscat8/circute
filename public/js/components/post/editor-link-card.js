var mlinkCard=null;


var urlData={};
class LinkCard extends HTMLElement{
    constructor(){
	super();
	const link_card_container=document
	      .createElement("template");
	var linkcard=document.createElement('a');
	link_card_container.className="linkcard-container";
	linkcard.className="linkcard";
	link_card_container.appendChild(linkcard);
	
	var main=document.createElement('div');
	main.className="linkcard-main";

	var img =document.createElement("div");
	img.className="linkcard-img";
	img.style.backgroundSize="cover";
	img.style.backgroundImage="url(https://circute2-1259491699.cos.ap-beijing.myqcloud.com/%E8%AF%BE%E8%A1%A82.png)";
	var main_title=
	    document.createElement("p");
	main_title.className="linkcard-main-title";
	main_title.innerText="ONISM.CC";
	
	var main_url_container=
	    document.createElement('div');
	main_url_container.className=
	    "linkcard-main-url-container";
	var main_url_icon=
	    document.createElement('i');
	main_url_icon.className="fa fa-link";
	var main_url=
	    document.createElement('small');
	main_url.className="linkcard-main-url";
	
	main_url_container.appendChild(main_url_icon);
	main_url_container.appendChild(main_url);
	main.appendChild(main_title);
	main.appendChild(main_url_container);
	linkcard.appendChild(main);
	linkcard.appendChild(img);
	
	this.appendChild(link_card_container);
	mlinkCard=this;
	var url=this.getAttribute("href");
	
	if(Boolean(urlData[url])){
	    linkcard.href=urlData[url];
	    main_url.innerText=urlData[url];	
	}else{
	    var time =  new Date().getTime();
	    urlData[url]=time;
	    linkcard.href=urlData[url];
	    main_url.innerText=urlData[url];	
	}

	console.dir(urlData);
	
    }

    init(){
	
    }
}

window.customElements.define("link-card",LinkCard);
