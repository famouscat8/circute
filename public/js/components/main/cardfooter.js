// card-footer
const _cardfooter=document.createElement('template');

_cardfooter.innerHTML=`
            <div class="card-footer b-m-1rem">
             card footer here!</div>`;

var mcardFooter=null;
class CardFooter extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_cardfooter.content.cloneNode(true));
    }

    init(){}
}


window.customElements.define('card-footer',CardFooter);
