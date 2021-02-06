let createTodo = document.getElementById("create")
let list = document.getElementById("todolist")
let textInput = document.getElementById("newtodo")
let todoArray = getStoredList()


isTodoValid(textInput, createTodo)
showStoredList()

createTodo.addEventListener("click", function (e) {
    e.preventDefault()
    todoArray.unshift(textInput.value)
    setStoredList(todoArray)
    showStoredList()
})

textInput.addEventListener("keyup", function (e) {
    e.preventDefault()
    isTodoValid(textInput, createTodo)
})


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


function delItem(event, listArray) {
    const li = event.target.parentElement
    const id = li.dataset.id
    const filteredList = getStoredList().filter((item, i) => {
        return i.toString() !== id
    })
    setStoredList(filteredList)
    listArray = getStoredList()
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
        let newLi = `<li data-id=${index}>${item}<span class="delbtn" onclick="delItem(event,todoArray)">Delete</span></li>`
        list.innerHTML += newLi
    })
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