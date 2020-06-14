// card-footer
const _cardfooter=document.createElement('template');

_cardfooter.innerHTML=`
            <div class="card-footer">查看更多
    <i class="fa fa-caret-down" aria-hidden="true"></i>
</div>`;

var mcardFooter=null;
class CardFooter extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_cardfooter.content.cloneNode(true));
	mcardFooter=this;
    }

    init(click,ajax,tools){
	var mm=document.getElementsByClassName('card-footer')[0];
	mm.onclick=()=>{
	 click(ajax,tools);   
	};
    }
}


window.customElements.define('card-footer',CardFooter);
