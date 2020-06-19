var mlinkCard=null;
const link_card_container=document
      .createElement("template");
var linkcard=document.createElement('a');
link_card_container.className="linkcard-container";
linkcard.className="linkcard";
link_card_container.appendChild(linkcard);

var time =  new Date().getTime();
class LinkCard extends HTMLElement{
    constructor(){
	super();
	this.appendChild(link_card_container);
	mlinkCard=this;
	var url=this.getAttribute("href");
	linkcard.href=url;
	linkcard.innerText=url;	
    }

    init(){
	
    }
}

window.customElements.define("link-card",LinkCard);
