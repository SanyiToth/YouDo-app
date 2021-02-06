let createTodo = document.getElementById("create")
let list = document.getElementById("todolist")
let textInput = document.getElementById("newtodo")
let todoArray = []


createTodo.addEventListener("click", function (e) {
    e.preventDefault()
    todoArray.unshift(textInput.value)
    showStoredList()
    textInput.value = ""
})

textInput.addEventListener("keyup", function (e) {
    e.preventDefault()
    if (isTodoValid(textInput)) {
        createTodo.disabled = false
    } else {
        createTodo.disabled = true
    }
})


function delItem(event) {
    const li = event.target.parentElement
    const id = li.dataset.id
    todoArray = todoArray.filter((item, i) => {
        return i.toString() !== id
    })
    showStoredList()
}

function showStoredList() {
    list.innerHTML = ""
    todoArray.forEach((item, index) => {
        let newLi = `<li data-id=${index}>${item}<span class="delbtn" onclick="delItem(event)">Delete</span></li>`
        list.innerHTML += newLi
    })
}

function isTodoValid(input) {
    if (input.value.length < 6) {
        input.classList.add("invalid")
        input.classList.remove("valid")
    } else {
        input.classList.remove("invalid")
        input.classList.add("valid")
    }
    return input.value.length >= 6
}