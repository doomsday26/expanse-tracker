let myForm = document.getElementById('myform');
let description= document.getElementById('descriptionInput')
let category= document.getElementById('category')
let expanse= document.getElementById('expanse')
const userList = document.querySelector('#displayList');



myForm.addEventListener('submit',add);
userList.addEventListener('click',removeItem)
userList.addEventListener('click',EditItem)
let count=0;

function add(e){
   
e.preventDefault();
if(description.value===''||expanse.value===''){ alert('please enter all fields')}
else{
   
  let obj={id:count.toString(), expanse:expanse.value, category:category.value,description: description.value}
  count++;
  let k = JSON.stringify(obj);
  localStorage.setItem(obj.id,k);
}
//clear previous list items,
let ul = document.getElementById('displayList');
while(ul.firstChild){ul.removeChild(ul.lastChild)}


//create new childs.
for (let i = 0; i < localStorage.length; i++) {
    let destring= JSON.parse(localStorage.getItem(localStorage.key(i)))
    // console.log(localStorage.key(i),destring.expanse, destring.category,destring.description);
    


//creating li object
let li= document.createElement('li');
li.id=destring.id;
li.appendChild(document.createTextNode(destring.expanse + ': ' ))
li.appendChild(document.createTextNode(destring.category+ " - "))
li.appendChild(document.createTextNode(destring.description))


//create span
let span = document.createElement('span');
span.appendChild(document.createTextNode('  '))
li.appendChild(span)
//delete button
let btn = document.createElement('button');
btn.className='delete'
btn.appendChild(document.createTextNode('DEL'))
li.appendChild(btn)


// edit button
let span2 = document.createElement('span');
span2.appendChild(document.createTextNode('  / '))
li.appendChild(span2)
let editbtn = document.createElement('button');
editbtn.className='edit'
editbtn.appendChild(document.createTextNode('EDIT'))
li.appendChild(editbtn)

ul.appendChild(li);


}
expanse.value=''
description.value=''

};


function removeItem(e){
    if(e.target.classList.contains('delete')){
    var li= e.target.parentElement;

     let key = li.id;
     console.log(key);
     localStorage.removeItem(key);
     userList.removeChild(li);
    }
}

function EditItem(e){
    if(e.target.classList.contains('edit')){
      var li= e.target.parentElement;
      let key = li.id;
      let destring= JSON.parse(localStorage.getItem(key))
category.value=destring.category;
expanse.value=destring.expanse;
description.value=destring.description;

      localStorage.removeItem(key);
      userList.removeChild(li);
     }
}