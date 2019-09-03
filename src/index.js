const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const createBtn = document.querySelector('.submit')
let addToy = false

document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => showToys(json))
})

function showToys(toys){
  toys.forEach(createCard)
}

function createCard(toy){
  toyCollection = document.querySelector('#toy-collection')

  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  let toyName = document.createElement('h2')
  toyName = toy['name']
  card.append(toyName)

  let toyImg = document.createElement('img')
  toyName.className = 'toy-avatar'
  toyImg.src = toy.image
  toyImg.style.height='220px'
  toyImg.style.display='block'
  toyImg.style.margin='auto'
  card.append(toyImg)

  let likes = document.createElement('p')
  likes.className = 'likesNumber'
  likes.innerText = toy.likes
  card.append(likes)

  let button = document.createElement('button')
  button.className = 'like-btn'
  button.innerText = "Like <3"
  card.append(button)
  button.addEventListener('click', function(){
    addLike(toy)
    window.location.reload()
  })

  toyCollection.appendChild(card)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


createBtn.addEventListener('submit', event => {
  event.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  })
  .then(function(response){
    response.json()
  })
  .then(function(object){
    createCard(object)
  })
  .catch(function(error){
    console.log(error.message)
  })
})

function addLike(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
    body: JSON.stringify({
      "likes": toy.likes +1
    })
  }
)}