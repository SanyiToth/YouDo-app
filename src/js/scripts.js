//can be deleted
console.log("Console log works!");

let createTodo = document.getElementById("create")
let list = document.getElementById("todolist")
let textInput = document.getElementById("newtodo")
let todoArray = []


createTodo.addEventListener("click", function (e) {
    e.preventDefault()
    let newTodo = textInput.value
    if (newTodo) {
        todoArray.unshift(newTodo)
        showStoredList()
    }
    textInput.value = ""
})


function delItem(event) {
    const li = event.target.parentElement
    const id = li.dataset.id
    const filteredList = todoArray.filter((item, i) => {
        return i.toString() !== id
    })
    todoArray = filteredList
    showStoredList()
}

function showStoredList() {
    list.innerHTML = ""
    todoArray.forEach((item, index) => {
        let newLi = `<li data-id=${index}>${item}<span class="delbtn" onclick="delItem(event)">Delete</span></li>`
        list.innerHTML += newLi
    })
}