// 编辑器界面我的文集组件

const list_books = document.createElement("template");

list_books.innerHTML=`<div class="books-list"></div>`;
var mlistBooks = null;

class ListBooks extends HTMLElement{
    constructor(){
	super();
	this.appendChild(list_books.content.cloneNode(true));
	mlistBooks = this;
	
    }
    
    init(ajax){
	function success(data){
	    var books_list = document
		.getElementsByClassName("books-list")[0];

	    for(let i=0;i<data.books.length;i++){
		let book = data.books[i];
		var item = document.createElement("div");
		item.innerHTML=
		    `<div class="books-item">
                    <p class="books-item-title" 
                    id="books-item-title-id-`+i+`"/>
                    <div class="books-item-footer">
               <small class="books-item-book">0篇文章</small>
               <small class="books-item-time">十天前修改</small>
      <small><i class='fa fa-wrench' aria-hidden='true'></i></small>
                </div>
                </div>`;
		books_list.appendChild(item);
		var title = document
		    .getElementById("books-item-title-id-"+i);
		title.innerText=book;
	    }
	    var newbooks = document.createElement("div");
	    newbooks.innerHTML=`
      <i class="fa fa-plus" aria-hidden="true"></i>
      <p class="books-item-newbooks-p">新建文集</p>`;
	    newbooks.className="books-item-newbooks";
	    
	    books_list.appendChild(newbooks);
	    console.dir(data);
	};
	function error(e){
	    console.dir(e);
	};
	
	var pd = {usertoken:"test token",action:"get my books"};
	ajax.post("/getbooks",JSON.stringify(pd),success,error);
    }
}

window.customElements.define('list-books',ListBooks);
