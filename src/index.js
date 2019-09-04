const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let allToyCards = document.querySelector('#toy-collection')
// YOUR CODE HERE

// fetch the toys
const toyURL = 'http://localhost:3000/toys'
function getToys(){
  return fetch(toyURL)
  .then(response => response.json())
}

// create and add info to cards
function makeToyCards(toy) {
  let toyName = document.createElement('h2')
  toyName.innerText = toy.name
  
  let toyImage = document.createElement('img')
  toyImage.setAttribute('src', toy.image)
  toyImage.setAttribute('class', 'toy-avatar')
  
  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} likes`

  let likeButton = document.createElement('button')
  likeButton.setAttribute('class', 'like-btn')
  likeButton.setAttribute('id', toy.id)
  likeButton.innerText = "Like"
  likeButton.addEventListener('click', (event) => {
    console.log(event.target.dataset)
    likes(event)
  })
  
  let toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  toyCard.append(toyName, toyImage, toyLikes, likeButton)
  allToyCards.append(toyCard) 
}

// like feature
function likes(event) {
  event.preventDefault()
    let addLike = parseInt(event.target.previousElementSibling.innerText) + 1
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": addLike
      })
    })
    .then(response => response.json())
    .then((like_obj => {
      event.target.previousElementSibling.innerText = `${addLike} likes`

    }))

}
//submit a toy
function addNewToy(toy_info) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy_info.name.value,
      "image": toy_info.image.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then((toy_obj) => {
    let newToy = makeToyCards(toy_obj)
    allToyCards.append(newToy)
  })


}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      addNewToy(event.target)
    })

  } else {
    toyForm.style.display = 'none'
  }
})

//call it!
getToys().then(toys => {
  toys.forEach(toy => {
    makeToyCards(toy)
  })
})


// OR HERE!


