let createTodo = document.getElementById("create")
let list = document.getElementById("todolist")
let textInput = document.getElementById("newtodo")
let dateInput = document.getElementById("duedate")
let todoArray = getStoredList()


showStoredList()

createTodo.addEventListener("click", function (e) {
    e.preventDefault()
    const todoItem = {
        todo: textInput.value,
        duedate: dateInput.value,
        priority: ""
    }
    todoArray.unshift(todoItem)
    setStoredList(todoArray)
    showStoredList()
    isTodoValid(textInput, createTodo)
})

textInput.addEventListener("keyup", function (e) {
    e.preventDefault()
    isTodoValid(textInput, createTodo)
})


function setStoredList(list) {
    localStorage.setItem('myitems', JSON.stringify(list))
}


function getStoredList() {
    if (localStorage.getItem('myitems') !== null) {
        return JSON.parse(localStorage.getItem('myitems'))
    } else {
        return []
    }
}


function delItem(event) {
    const li = event.target.parentElement
    const id = li.dataset.id
    const filteredList = getStoredList().filter((item, i) => {
        return i.toString() !== id
    })
    setStoredList(filteredList)
    todoArray = getStoredList()
    showStoredList()
}


function listClear() {
    return list.innerHTML = ""
}

function inputClear() {
    return textInput.value = ""
}

function showStoredList() {
    listClear()
    getStoredList().forEach((item, index) => {
        let newLi = `<li data-id=${index}>${item.todo} , Due date: ${item.duedate}<span class="delbtn" onclick="delItem(event)">Delete</span></li>`
        list.innerHTML += newLi
    })
    console.log(getStoredList())
    inputClear()
}

function isTodoValid(input, button) {
    if (input.value.length < 6) {
        input.classList.add("invalid")
        input.classList.remove("valid")
        button.disabled = true
    } else {
        input.classList.remove("invalid")
        input.classList.add("valid")
        button.disabled = false
    }
    return input.value.length >= 6
}