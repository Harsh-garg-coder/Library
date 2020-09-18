
// constructor function
function Book(name,author,type){
    this.name=name;
    this.author=author;
    this.type= type;
}

// display constructor
function Display(){

}

// add method to display prototype
// this function add the book 
Display.prototype.add=function(book){
    let html='';
    let tablebody = document.getElementById('tablebody');
    html =`  <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
            </tr>`
    tablebody.innerHTML += html;
}

// this function clear the form entities after adding book
Display.prototype.clear= function(){
    let form =document.getElementById('form')
    form.reset();
}

// this function check that whether the book is valid or not
Display.prototype.validate = function(book){
    if(book.name.length>3 && book.author.length>3){
        return true;
    }
    else{
        return false;
    }
}


Display.prototype.showold = function(){
    let storage = localStorage.getItem('backup');
    let tablebody = document.getElementById('tablebody');
    let html;
    
    if(storage == null){
        storageobj = [];
    }
    else{
        storageobj = JSON.parse(storage);
    }
    console.log(storageobj);
    storageobj.forEach(function(element){

        html =`  <tr>
        <td>${element['name']}</td>
        <td>${element['author']}</td>
        <td>${element['type']}</td>
        
        </tr>`
        if(storageobj.length == null){
            tablebody.innerHTML ='';
        }
        else{
            tablebody.innerHTML +=html
        }
    })
    }
let display2 =new Display();
display2.showold();


// #adding event listener
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click',addbookmethod)

// addbookmethod which add the book
function addbookmethod(e){
    e.preventDefault();
    console.log('you have added a book');
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let type;
    let adventure = document.getElementById('adventure');
    let romantic = document.getElementById('romantic');
    let thrill = document.getElementById('thrill');

    if(adventure.checked){
        type = 'adventure';
    }
    else if(romantic.checked){
        type = 'romantic';
    }
    else if(thrill.checked){
        type = 'thrill';
    }
    
    let book = new Book(name,author,type);
    console.log(book);

    let storage = localStorage.getItem('backup');
    if(storage == null){
        storageobj = [];
    }
    else{
        storageobj = JSON.parse(storage);
    }
    storageobj.push(book);
    localStorage.setItem('backup',JSON.stringify(storageobj));

    let display = new Display();
    if(display.validate(book)){

        display.add(book);
        display.clear();
        
    }
    else{
        alert('You cant add this book(you need to fill the details first)')
    }
    // e.preventDefault();
}
