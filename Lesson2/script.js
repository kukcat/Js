let inputList = document.querySelector(".list_text");
let todoList = document.querySelector(".todo");
let todoListRestore = document.querySelector(".restore");
let tagList = document.querySelector('.select');
let tagListFind = document.querySelector('.select_find');
let removeBtn = document.querySelector(".list_remove");
let listAddBtn = document.querySelector(".list_add");

let tasksListElement = document.querySelector(`.todo`);
let taskElements = tasksListElement.querySelectorAll(`.todo_item`);

let todoListArr = [];
let todoListArrRestore = [];

if (localStorage.getItem("todoArr") != null) {
    
    todoListArr = JSON.parse(localStorage.getItem('todoArr'));

}
if(localStorage.getItem("todoArrRestore") != null) {
    
    todoListArrRestore = JSON.parse(localStorage.getItem('todoArrRestore'));

}

tagListFind.addEventListener('change', () => reCreate())
removeBtn.addEventListener('click', () => deleteAll());
listAddBtn.addEventListener('click', () => creator(inputList.value, tagList.value, getCurrentDate()));
tasksListElement.addEventListener(`dragstart`, (evt) => {evt.target.classList.add(`selected`);})
tasksListElement.addEventListener(`dragend`, (evt) => {evt.target.classList.remove(`selected`);});

    //-----------  Добавить элементы в массив и локальное хранилище  -------------

let creator = (text, tag, date) => {

    if(text == ''){
        return;
    }

    const task = {
        'text': text,
        'tag': tag,
        'date': date
    }

    inputList.value = '';
    todoListArr.push(task); 
        //-----------  localStorage  -------------

    addToLocalStorage();
  
    if(tag == tagListFind.value || tagListFind.value == 'Всё'){
        addTodoItem(todoListArr.length-1,1);
    }

}

    //-----------  Удалить всё -------------

let deleteAll = () =>  {
    localStorage.removeItem('todoArr');
    todoListArr = [];
    todoListArrRestore = [];
    reCreate();
}

const getCurrentDate = () => {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return dateTime
}

    //-----------  Добавить элементы на страницу из массива  -------------

let addTodoItem = (id, variant) =>{
    
        let newTodoItem = document.createElement('li');
        newTodoItem.classList.add('todo_item');
        newTodoItem.setAttribute('data-index-number', id);
        newTodoItem.setAttribute('draggable', true)
        if(variant == 1){
            todoList.append(newTodoItem);
            newTodoItem.innerHTML= ` 
                <div class="todo_number">${num}</div>
                <div class="todo_item_wrapper"><input onclick="changeTodoText(this)" value="${todoListArr[id].text}" class="todo_text" onclick="changeTodoText(this)">
                <div class="todo_tag">${todoListArr[id].tag}</div>
                <div class="todo_date">${todoListArr[id].date}</div>
                <div class="todo_remove" onclick="removeTodoElement(this)">Удалить</div></div>
            `
            
            num++;

        }else if(variant == 2){
            todoListRestore.append(newTodoItem);
                    newTodoItem.innerHTML= ` 
                <div class="todo_number">${numRestore}</div>
                <div class="todo_item_wrapper">
                <div class="todo_text">${todoListArrRestore[id].text}</div>
                <div class="todo_tag">${todoListArrRestore[id].tag}</div>
                <div class="todo_date">${todoListArrRestore[id].date}</div>
                <div class="todo_restore" onclick="restoreTodoElement(this)">Восстановить</div>
                <div class="todo_full_remove" onclick="removeTodoRestoreElement(this)">Удалить</div></div>
            `
            numRestore++;
        }
        
}

    //-----------  Пересоздать страницу  -------------

let reCreate = () => {

    num = 1;
    numRestore = 1;
    
    todoList.innerHTML = ``;
    todoListRestore.innerHTML = ``;
    
    if(todoListArr != null){
        for (let i = 0; i < todoListArr.length; i++) {
            if(tagListFind.value=='Всё' || tagListFind.value == todoListArr[i].tag){
                addTodoItem(i,1);
            }
        }
    }
    if(todoListArrRestore != null){
        for (let i = 0; i < todoListArrRestore.length; i++) {
            if(tagListFind.value=='Всё' || tagListFind.value == todoListArrRestore[i].tag){
                addTodoItem(i,2);
            }
        }
    }
}


let restoreTodoElement = (element) => {
    todoListArr.push(todoListArrRestore[element.closest(".todo_item").getAttribute('data-index-number')]);
    todoListArrRestore.splice(element.closest(".todo_item").getAttribute('data-index-number'),1);
    reCreate();
    addToLocalStorage();
}

let removeTodoElement = (element) => {
    todoListArrRestore.push(todoListArr[element.closest(".todo_item").getAttribute('data-index-number')]);
    todoListArr.splice(element.closest(".todo_item").getAttribute('data-index-number'),1);
    reCreate();
    addToLocalStorage();
}

let removeTodoRestoreElement = (element) => {
    todoListArrRestore.splice(element.closest(".todo_item").getAttribute('data-index-number'),1);
    reCreate();
    addToLocalStorage();
}
    //----------- добавить элементы в localStorage  -------------


let addToLocalStorage = () =>{
    localStorage.setItem('todoArr', JSON.stringify(todoListArr));
    localStorage.setItem('todoArrRestore', JSON.stringify(todoListArrRestore));
}

    //-----------  Изменить текст элемента на странице  -------------




let changeTodoText = (element) =>{
    //setTimeout(() => changeTodoTextModal(element), 600);  
    element.addEventListener('change', ()=>{
        console.log(element.value)
        todoListArr[element.closest(".todo_item").getAttribute('data-index-number')].text = element.value
        addToLocalStorage()
    })
}

let changeTodoTextModal = (element) => {
    let body = document.querySelector("body");
    let newTodoItem = document.createElement('div');
    body.prepend(newTodoItem);
    newTodoItem.setAttribute('data-index-number', element.closest(".todo_item").getAttribute('data-index-number'));
    newTodoItem.classList.add('background');

    newTodoItem.innerHTML= ` <div class="change_text">
        <label for="change_textarea">Смените текст</label>
        <textarea type="text" class="change_textarea" id="change_textarea">${element.innerHTML}</textarea>
        <div class="change_text_btn" onclick="changeTodoItem(this)">Изменить</div>
        <div class="change_text_btn_close" onclick="removeChangeElement(this)">закрыть</div>
    </div>`
}

    //-----------  Закрыть окошко изменения элемента без изменений  -------------

    let removeChangeElement = (element) => {
    element.closest(".background").remove();
}

let changeTodoItem = (element) =>{
    todoListArr[element.closest('.background').getAttribute('data-index-number')].text = document.querySelector('.change_textarea').value;
    reCreate();
    addToLocalStorage();
    removeChangeElement(element);

    setTimeout(() => viewChangedText(), 600);
}

let viewChangedText = () =>{
    let body = document.querySelector("body");
    let newTodoItem = document.createElement('p');
    newTodoItem.classList.add('changed');
    newTodoItem.innerText = `Текст успешно изменен`;
    body.prepend(newTodoItem);
    setTimeout(() => removeChangedText(newTodoItem), 1200);
}

let removeChangedText = (element) =>{
    element.remove();
}

reCreate();


tasksListElement.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
    let activeElement = tasksListElement.querySelector(`.selected`);
 
    let currentElement = evt.target;
    let isMoveable = false

    if(activeElement !== currentElement && currentElement.classList.contains(`todo_item`)){
        isMoveable = true
    }else(
        isMoveable = false
    )

    // Если нет, прерываем выполнение функции
    if (!isMoveable) {
      return;
    }
    // console.log(activeElement)
    // console.log(activeElement.nextElementSibling)
    // Находим элемент, перед которым будем вставлять
    let nextElement = (currentElement === activeElement.nextElementSibling) ?
        currentElement.nextElementSibling :
        currentElement;
  
    // Вставляем activeElement перед nextElement
    tasksListElement.insertBefore(activeElement, nextElement);

    let draggedElement = todoListArr[activeElement.getAttribute('data-index-number')];
    
    todoListArr[currentElement.nextElementSibling.getAttribute('data-index-number')]

  });