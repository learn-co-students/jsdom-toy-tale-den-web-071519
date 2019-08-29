const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')

// YOUR CODE HERE

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

function getToys() {
    return fetch('http://localhost:3000/toys')
        .then(response => response.json())
}

function postToy(toy_data) {
    fetch("http://localhost:3000/toys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": toy_data.name.value,
                "image": toy_data.image.value,
                "likes": 0
            })
        })
        .then(response => response.json())
        .then((obj_toy) => {
            let new_toy = renderToys(obj_toy)
            divCollect.append(new_toy)
        })
}

function likes(event) {
    event.preventDefault()
    let more = parseInt(event.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${event.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "likes": more
            })
        })
        .then(response => response.json())
        .then((like_obj => {
            event.target.previousElementSibling.innerText = `${more} likes`;
        }))
}

function renderToys(toy) {
    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let button = document.createElement('button')
    button.setAttribute('class', 'like-button')
    button.setAttribute('id', toy.id)
    button.innerText = "like"
    button.addEventListener('click', (event) => {
        console.log(event.target.dataset);
        likes(event)
    })

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, button)
    divCollect.append(divCard)
}

// OR HERE!
getToys().then(toys => {
    toys.forEach(toy => {
        renderToys(toy)
    })
})