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
    init(ajax,usermanager,tools,clickbooks){
	// 新建文集的方法
	function createBooks(books_name){
	    var token = usermanager.getToken();
	    var pd = {
		usertoken:token,
		books:books_name,
		action: "createbooks",
	    };
	    function success(data){
		console.dir(data);
	    };
	    function error(e){
		console.dir(e);
	    };
	    ajax.post("/createbooks",
		      JSON.stringify(pd),
		      success,error);
	}
	
	// 获取用户输入文集标题的方法
	var getBooksTitle=()=>{
	    layer.prompt({
		formType:0,
		value:'',
		title:'请输入标题:',
		maxlength:20,
	    },function(value,index,elem){
		layer.close(index);
		createBooks(value);
	    });
	}
	
	function success(data){
	    var books_list = document
		.getElementsByClassName("books-list")[0];
	    console.dir(data);
	    for(let i=0;i<data.bookss.length;i++){
		let books = data.bookss[i];
		var item = document.createElement("div");
		item.innerHTML=
		    `<div class="books-item">
                    <p class="books-item-title" 
                    id="books-item-title-id-`+i+`"/>
                    <div class="books-item-footer">
               <small class="books-item-book"
                     id="books-item-book-id-`+i+`"></small>
               <small class="books-item-time"
                     id="books-item-time-id-`+i+`"></small>
      <small><i class='fa fa-wrench' aria-hidden='true'></i></small>
                </div>
                </div>`;
		books_list.appendChild(item);
		var title = document
		    .getElementById("books-item-title-id-"+i)
		    .innerText=books.booksname;
		var articalnum = document
		    .getElementById('books-item-book-id-'+i)
		    .innerText=books.articalnum+'篇文章';
		var time = document
		    .getElementById('books-item-time-id-'+i)
		    .innerText=tools.getDateDiff(books.time)+'创建';
		item.onclick=()=>{
		    clickbooks(books.bid,books.booksname);
		}
	    }
	    
	    var newbooks = document.createElement("div");
	    newbooks.innerHTML=`
      <button class="books-item-newbooks-btn">
      <i class="fa fa-plus" aria-hidden="true"></i>
      <p class="books-item-newbooks-p">新建文集</p></button>`;
	    newbooks.className="books-item-newbooks";
	    books_list.appendChild(newbooks);
	    var createbooks_btn = document
		.getElementsByClassName("books-item-newbooks-btn")[0];
	    createbooks_btn.onclick=getBooksTitle;
	    console.dir(data);
	};
	function error(e){
	    console.dir(e);
	};
	
	var token = usermanager.getToken();
	var pd = {usertoken:token,action:"get my books"};
	ajax.post("/getbooks",JSON.stringify(pd),success,error);
    }
}

window.customElements.define('list-books',ListBooks);
