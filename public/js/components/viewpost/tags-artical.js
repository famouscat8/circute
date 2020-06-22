const _tags_artical=document.createElement("template");

_tags_artical.innerHTML=`
     <div class="tags-artical-container">
     
   <div class="tag-container">
   <i class="fa fa-tag" aria-hidden="true"></i>
   <small class="tag-text">MarkedJs</small>
   </div>


   <div class="tag-container">
   <i class="fa fa-tag" aria-hidden="true"></i>
   <small class="tag-text">MarkDown</small>
   </div>
   <div class="tag-container">
   <i class="fa fa-tag" aria-hidden="true"></i>
   <small class="tag-text">Javascript</small>
   </div>
   <div class="tag-container">
   <i class="fa fa-tag" aria-hidden="true"></i>
   <small class="tag-text">CSS</small>
   </div>
   <div class="tag-container">
   <i class="fa fa-tag" aria-hidden="true"></i>
   <small class="tag-text">TEst</small>
   </div>
   <div class="tag-container">
   <i class="fa fa-tag" aria-hidden="true"></i>
   <small class="tag-text">Tag-one</small>
   </div>
   <div class="tag-container">
   <i class="fa fa-tag" aria-hidden="true"></i>
   <small class="tag-text">Tag-one</small>
   </div>

     </div>`;


var mtagsArtical=null;

class TagsArtical extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_tags_artical.content.
			 cloneNode(true));
    }
    
}


window.customElements.define("tags-artical",TagsArtical);
