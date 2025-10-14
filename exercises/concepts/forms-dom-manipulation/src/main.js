import './style.css'

const formElement = document.querySelector('form')
const itemsList = document.querySelector('#items')

const priorityColor = {
  low: 'green',
  medium: 'yellow',
  high: 'red'
}

formElement.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const listItem = document.createElement('li')
  listItem.innerHTML = formData.get('title')
  listItem.setAttribute('style', `color: ${priorityColor[formData.get('priority')]}`)

  const createButton = document.createElement('button')
  createButton.innerText = 'Complete'

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'

  listItem.append(createButton)
  listItem.append(deleteButton)

  itemsList.append(listItem)
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

// 36 minutos hasta aca y con ayuda de la IA para algunas cosas