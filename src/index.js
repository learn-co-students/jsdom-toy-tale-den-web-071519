const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyColection = document.querySelector('#toy-collection');
let addToy = false

addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
        toyForm.style.display = 'block'
        toyForm.addEventListener('submit', e => {
            e.preventDefault()
            createNewToy(event.target)
        })
    } else {
        toyForm.style.display = 'none'
    }
})

function getToys() {
    return fetch("http://localhost:3000/toys")
        .then(function(response) {
            return response.json();
        })
}

function craftToys(toy) {
    let div = document.createElement('div')
    div.id = "toy-collection"
    div.setAttribute('class', 'card')
        //name
    let h1 = document.createElement('h1')
    h1.innerText = toy["name"]
        //img
    let img = document.createElement('img')
    img.setAttribute("src", toy.image)
        //likes
    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
        //button
    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.innerText = "Like <3"
    btn.addEventListener('click', (event) => {
            likes(event)
        })
        //package in the div
    div.append(h1, img, p, btn)
    toyColection.prepend(div)
}


function formatToys() {
    getToys().then(toys => {
        toys.forEach(toy => {
            craftToys(toy)
        })
    });
}

function createNewToy(toyData) {
    fetch("http://localhost:3000/toys", {
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
        .then(toy => {
            let addedToy = craftToys(toy)
        })
}

function likes(event) {
    event.preventDefault()
    let newLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                likes: newLikes
            })
        })
        .then(res => res.json())
        .then(like_obj => {
            event.target.previousElementSibling.innerText = `${newLikes} likes`;
        });
}

// const likeBtn = document.querySelectorAll(".like-btn");
// likeBtn.forEach(addEventListener("click", () => {
//     console.log("hey")
// }))

//launch when dom loads
document.addEventListener("DOMContentLoaded", function() {
        formatToys();
    })
    //