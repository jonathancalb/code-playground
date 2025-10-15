import './style.css'

const formElement = document.querySelector('form')

const priorityColor = {
  low: 'green',
  medium: 'yellow',
  high: 'red'
}

const items = []

function renderList() {
  const unorderedList = document.querySelector('#items')
  unorderedList.innerHTML = ''

  if (items.length) {
    for (const [index, {title, priority, completed}] of items.entries()) {
      const listItem = document.createElement('li')
      listItem.innerText = title
      listItem.style.color = priorityColor[priority]
  
      const completeButton = document.createElement('button')
      completeButton.innerText = completed ? 'Undo' : 'Complete'
      completeButton.addEventListener('click', _ => {
        items[index].completed = completed ? false : true
        renderList()
      })
      listItem.append(completeButton)
  
      const deleteButton = document.createElement('button')
      deleteButton.innerText = 'Delete'
      deleteButton.addEventListener('click', _ => {
        items.splice(index, 1)
        renderList()
      })
      listItem.append(deleteButton)
      
      unorderedList.append(listItem)
    }
  }
}

formElement.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(e.target)
  
  const title = formData.get('title')
  const priority = formData.get('priority')
  const completed = false

  items.push({ title, priority, completed })
  renderList()

  e.target.reset()
})

for (const element of formElement.elements) {
  element.addEventListener('invalid', e => {
    e.target.classList.add('error')
  })
  element.addEventListener('change', e => {
    e.target.classList.remove('error')
  })
}
