let createTodo = document.getElementById("create")
let list = document.getElementById("todolist")
let textInput = document.getElementById("newtodo")
let dateInput = document.getElementById("duedate")
let priorityInput = document.getElementById("priority")
let todoArray = getStoredList()


showStoredList()

createTodo.addEventListener("click", function (e) {
    e.preventDefault()
    const todoItem = {
        todo: textInput.value,
        duedate: dateInput.value,
        priority: priorityInput.value
    }
    todoArray.unshift(todoItem)
    setStoredList(todoArray)
    showStoredList()
    isTodoValid(textInput, dateInput, createTodo)
})

textInput.addEventListener("keyup", function (e) {
    e.preventDefault()
    isTodoValid(textInput, dateInput, createTodo)
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
        let newLi = `<li data-id=${index}>${item.todo} , Due date: ${item.duedate} , Priority: ${item.priority}<span class="delbtn" onclick="delItem(event)">Delete</span></li>`
        list.innerHTML += newLi
    })
    console.log(getStoredList())
    inputClear()
}

function isTodoValid(input1, input2, button) {
    if (input1.value.length < 6 && input2.value) {
        input1.classList.add("invalid")
        input1.classList.remove("valid")
        input1.classList.add("invalid")
        input1.classList.remove("valid")
        button.disabled = true
    } else {
        input1.classList.remove("invalid")
        input1.classList.add("valid")
        input1.classList.remove("invalid")
        input1.classList.add("valid")
        button.disabled = false
    }
    return input1.value.length >= 6
}