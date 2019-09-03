const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

let toyCollection = document.querySelector('#toy-collection')

function getToys(){
  return fetch('http://localhost:3000/toys')
    .then(function(response){
      return response.json()
    })
}

function newToy(toyInfo){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyInfo.name.value,
      "image": toyInfo.image.value,
      "like": 0
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function (object){
    let new_toy = createToys(object)
    toyCollection.append(new_toy)
  })
}

function likes(event){
  event.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    e.target.previousElementSibling.innerText = `${more} likes`
  })
}

function createToys(toy){

  let name = document.createElement('h2')
  name.innerText = toy.name

  let image = document.createElement('IMG')
  image.setAttribute('src', toy.image)
  image.setAttribute('class', 'toy-avatar')

  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} Likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.innerText = 'Like <3'
  button.addEventListener('click', (event) => {
    likes(event)
  })

  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.append(name, image, likes, button)
  toyCollection.append(card)

}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
        event.preventDefault()
        newToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys()
  .then(function(toys){
    toys.forEach(function(toy){
      createToys(toy)
    })
  })
