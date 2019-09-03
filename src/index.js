const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')

function getToys(){
  return fetch("http://localhost:3000/toys")
    .then(res => res.json())
}

function postToy(toyData){
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        "name": toyData.name.value,
        "image": toyData.image.value,
        "likes": 0
    })
  })
    .then(res => res.json())
    .then((toyObj) => {
      let newToy = createToy(toyObj)
      divcollect.append(newToy)
    })
}

function createToy(toy) {
  let card = document.createElement('div')
    card.className = "card"
  let title = document.createElement('h1')
    title.innerText = toy.name
  let picture = document.createElement('img')
    picture.src = toy.image
    picture.className = "toy-avatar"
  let likes = document.createElement('p')
    likes.innerText = toy.likes
  let liker = document.createElement('button')
    liker.innerText = "Like <3"
    liker.className = "like-btn"
    liker.id = toy.id
    liker.addEventListener("click", (e)=>{
      console.log(e.target.dataset);
      likeToy(e)
    })
  card.append(title, picture, likes, liker)
  divCollect.append(card)
}

function likeToy(e){
  e.preventDefault()
  let anotherOne = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": anotherOne
    })
  })
  .then(res => res.json())
  .then((likeToy => {
    e.target.previousElementSibling.innerText = `${anotherOne} likes`;
  }))
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys().then(toys => {
  toys.forEach(toy => {
    createToy(toy)
  })
})
// OR HERE!
