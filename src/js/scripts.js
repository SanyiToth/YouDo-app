//can be deleted
console.log("Console log works!");

let createTodo = document.getElementById("create")
let list = document.getElementById("todolist")
let textInput = document.getElementById("newtodo")


createTodo.addEventListener("click", function (e) {
    e.preventDefault()
    let newTodo = textInput.value
    let newLi = `<li>${newTodo}</li>`
    list.innerHTML += newLi
    textInput.value=""
})