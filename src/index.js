const BASE_URL = "http://localhost:3000/toys"
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")

  // Toggles new toy form on "Add a new toy!" button click
  addBtn.addEventListener("click", () => {
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })

  // Handles new toy form submit
  toyFormContainer.addEventListener("submit", event => {
    event.preventDefault

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": event.target[0].value,
        "image": event.target[1].value,
        "likes": 0
      })
    })
  })

  fetchToys()
})

function fetchToys() {
  fetch(BASE_URL)
  .then(response => response.json())
  .then(toys => addToysToCollection(toys))
}

function addToysToCollection(toys) {
  const collection = document.getElementById("toy-collection")

  for (toy of toys) {
    // Create card and child elements with attributes and text
    const card = document.createElement("div")
    card.classList.add("card")
    card.setAttribute("id", `${toy.id}`)

    const h2 = document.createElement("h2")
    h2.innerText = toy.name

    const img = document.createElement("img")
    img.src = toy.image
    img.classList.add("toy-avatar")

    const p = document.createElement("p")
    p.innerText = `${toy.likes} Likes`

    const button = document.createElement("button")
    button.classList.add("like-btn")
    button.innerHTML = "Like <3"
    button.addEventListener("click", event => {
      updateLikes(event)
    })
    
    // Append it all to DOM
    card.append(h2, img, p, button)
    collection.appendChild(card)
  }
}

function updateLikes(event) {
  event.preventDefault()

  let div = event.target.parentElement
  let likesNum = event.target.previousElementSibling
  let increment = parseInt(likesNum.innerText) + 1

  fetch(`${BASE_URL}/${event.target.parentElement.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "likes": `${increment}`
    })
  })
  .then(response => response.json())
  .then(data => {
    likesNum.remove()
    likesNum.innerText = `${increment} Likes`
    div.insertBefore(likesNum, div.children[2])
  })
}