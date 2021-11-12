const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
  todos.forEach((todo) => {
    addToDo(todo)
  })
}
form.addEventListener('submit', (e) => {
  e.preventDefault()

  addToDo()
})

// Adding the new item in the list
function addToDo(todo) {
  let todoText = input.value
  if (todo) {
    todoText = todo.text
  }
  if (todoText) {
    const todoEl = document.createElement('li')
    if (todo && todo.completed) {
      todoEl.classList.add('completed')
    }
    todoEl.innerText = todoText

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed')
      document.getElementById('form').submit()
      updateLS()
    })

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      todoEl.remove()
      updateLS()
    })
    todosUL.appendChild(todoEl)
    input.value = ''
  } else {
    alert('Todo must not be empty')
  }
}

function updateLS() {
  const todoEl = document.querySelectorAll('li')
  const todos = []
  todoEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    })
  })
  localStorage.setItem('todos', JSON.stringify(todos))
}
