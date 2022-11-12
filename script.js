let myForm = document.getElementById('myform');
let description= document.getElementById('descriptionInput')
let category= document.getElementById('category')
let expanse= document.getElementById('expanse')
const userList = document.querySelector('#displayList');

const http= "https://crudcrud.com/api/4eb53d2d18d74e289956fa02aa920fdc/expanseTracker"
let unikey;

myForm.addEventListener('submit',add);
userList.addEventListener('click',removeItem)
userList.addEventListener('click',EditItem)

window.addEventListener('DOMContentLoaded',async()=>{
  await axios.get(http).then(res=>{ 
    displayExpanses(res.data)
   }).catch(err=>{console.log(err)});  

})

async function add(e){
   
e.preventDefault();
if(description.value===''||expanse.value===''){ alert('please enter all fields')}
else{
   
  let obj={"expanse":expanse.value, "category":category.value,"description": description.value}
await axios.post(http,obj).then(res=> console.log(res.data)).catch(err=>{console.log(err);})
await axios.get(http).then(res=>{ 
  displayExpanses(res.data)
  ; }).catch(err=>{console.log(err)});  
}
}

//display expanses
function displayExpanses(data){

//clear previous list items,
let ul = document.getElementById('displayList');
while(ul.firstChild){ul.removeChild(ul.lastChild)}


//create new childs.
for (let i = 0; i < data.length  ; i++) {
    let destring=data[i];
  //  console.log(destring._id,destring.expanse, destring.category,destring.description);
    


//creating li object
let li= document.createElement('li');
li.id=destring._id;
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


async function removeItem(e){
  if(e.target.classList.contains('delete')){
    var li= e.target.parentElement;
  
     let key = li.id;
    await axios.delete(http+"/"+key).
     then( async (res)=>{console.log(res.data);
     }).catch(err=>{console.log(err);})
    }
  
   await axios.get(http).then(res=>{
  displayExpanses(res.data);
  } )
  .catch(err=>console.log(err))
    }


//update the value,

async function EditItem(e){

  if(e.target.classList.contains('edit')){
  let li= e.target.parentElement;
  let key = li.id;
  console.log(key);
  await axios.get(http+ "/"+key).then( (res)=>{
expanse.value= res.data.expanse;
description.value=res.data.description;
category.value=res.data.category
  console.log(res.data._id); 
  } ).catch(err=>console.log(err))
  
  unikey=key;
  
  myForm.removeEventListener('submit',add)
  
  myForm.addEventListener('submit', updated)
  
  }
  
  }
  
  async function updated(e){
   e.preventDefault();
    await axios.put(http+"/"+unikey,{
      "expanse":expanse.value, "category":category.value,"description": description.value
    }).then(res=>{console.log(res);}).catch(err=>{console.log(err);})
  
    myForm.removeEventListener('submit',updated)
    myForm.addEventListener('submit', add)
    unikey='';
  
  
    await axios.get(http).then(res=>{
      displayExpanses(res.data);console.log(res.data);
      } )
      .catch(err=>console.log(err))
  }