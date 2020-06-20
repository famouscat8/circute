var mlinkCard=null;


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
	var title=this.getAttribute('title');
	
	main_title.innerText=title;
	linkcard.href=url;
	if(url.indexOf("https://")==0){
	    url=url.substring(8,url.length);
	}else if(url.indexOf("http://")==0){
	    url=url.substring(7,url.length);
	}
	main_url.innerText=url;
	
    }
}

window.customElements.define("link-card",LinkCard);
