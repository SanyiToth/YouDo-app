let createTodo = document.getElementById("create")
let selectInput = document.getElementById("selector")
let form = document.getElementById("todo-form")
let list = document.getElementById("todolist")
let textInput = document.getElementById("newtodo")
let dateInput = document.getElementById("duedate")
let priorityInput = document.querySelectorAll('input[name="priority"]')
let filterBox = document.getElementById("filter-box")
let todoArray = getStoredList()
let todoArrayItem = {}
let itemIndex = null

//load selectInput value from LocalStorage
selectInput.value = localStorage.getItem('valueOfFilteredList')
logFilteredList()

form.addEventListener("submit", event => {
    event.preventDefault()
    setTodoArrayItem(textInput, dateInput, getRadioInputValue(priorityInput))
    updateTodoList()
    inputClear()
    validateTodoItem(textInput, createTodo)
    setStoredList(todoArray)
    logFilteredList()
})

form.addEventListener("keyup", event => {
    event.preventDefault()
    validateTodoItem(textInput, createTodo)
})

list.addEventListener("click", event => {
    itemIndex = event.target.parentElement.dataset.id
    delItem(event)
    showSelectedItem(event);
    logSelectedItemOnInput(event)
})

filterBox.addEventListener("click", function (){
    logFilteredList()
    //save selectInput value in LocalStorage
    localStorage.setItem('valueOfFilteredList', selectInput.value)
})

function logFilteredList() {
    listClear()
    getFilteredList().forEach((item, index) => {
        let newLi = `<li data-id=${index}>${item.text} , Due date: ${item.date} , Priority: ${item.priority} 
        <span class="editbtn" onclick="">Edit</span>
        <span class="delbtn">Delete</span></li>`
        list.innerHTML += newLi
    })
}

function getFilteredList() {
    return getStoredList().filter((item) => {
        if (item.priority === localStorage.getItem('valueOfFilteredList')) {
            return item.priority
        } else if (localStorage.getItem('valueOfFilteredList') === "all") {
            return getStoredList()
        }
    })
}


function logSelectedItemOnInput(event) {
    if (event.target.classList.contains('editbtn')) {
        textInput.value = getFilteredList()[itemIndex].text
        dateInput.value = getFilteredList()[itemIndex].date
        priorityInput.value = getFilteredList()[itemIndex].priority
    }
}



function showSelectedItem(event) {
    Array.from(list.children).forEach((item) => {
        const selectedItem = event.target
        const listItem = item.children.item(0)
        if (selectedItem === listItem) {
            listItem.textContent = "Selected"
            item.style.border = "2px solid red"
            createTodo.value = "Save"
            validateTodoItem(textInput, createTodo)
        } else {
            listItem.textContent = "Edit"
            item.style.border = "none"
        }
    })
}



function delItem(event) {
    if (event.target.classList.contains('delbtn')) {
        const filteredList = getFilteredList().filter((item, i) => {
            return i.toString() !== itemIndex
        })
        setStoredList(filteredList)
        todoArray = getStoredList()
        logFilteredList()
    }
}

function setTodoArrayItem(text, date, priority) {
    todoArrayItem = {
        text: text.value,
        date: date.value,
        priority: priority.value
    }
}

function setStoredList(listArray) {
    localStorage.setItem('myitems', JSON.stringify(listArray))
}

function getStoredList() {
    if (localStorage.getItem('myitems') !== null) {
        return JSON.parse(localStorage.getItem('myitems'))
    } else {
        return []
    }
}

function listClear() {
    return list.innerHTML = ""
}

function inputClear() {
    textInput.value = ""
}


function validateTodoItem(input, button) {
    if (input.value.length < 6) {
        input.classList.add("invalid")
        input.classList.remove("valid")
        button.disabled = true
    } else {
        input.classList.remove("invalid")
        input.classList.add("valid")
        button.disabled = false
    }
}

function getRadioInputValue(input) {
    let value = ""
    input.forEach((item) => {
        if (item.checked) {
            value = item
        }
    })
    return value
}


function updateTodoList() {
    if (createTodo.value === "Create") {
        todoArray.unshift(todoArrayItem)
    } else {
        todoArray[itemIndex] = todoArrayItem
        createTodo.value = "Create"
    }
}



/*function logStoredList() {
    listClear()
    getStoredList().forEach((item, index) => {
        let newLi = `<li data-id=${index}>${item.text} , Due date: ${item.date} , Priority: ${item.priority}
        <span class="editbtn" onclick="">Edit</span>
        <span class="delbtn">Delete</span></li>`
        list.innerHTML += newLi
    })
    inputClear()
}*/