document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };
////////////////////////////////////////////////////
let but = document.getElementById("fortuneButton")
function fortune(){
    axios.get("http://localhost:4000/api/fortune/")
    .then(function (response) {
      const data = response.data;
      alert(data);
    });
}
but.addEventListener('click', fortune)
/////////////////////////////////////////////////////
const memesContainer = document.getElementById('memescontainer')
const form = document.querySelector('form')

const baseURL = 'http://localhost:4000/api/memes'

const memesCallBack = ({data: memes}) => displayMemes(memes)
const errCallback = err => console.log(err.response.data)

const getAllMemes = () => axios.get(baseURL).then(memesCallBack).catch(errCallback)
const createMemes = body => axios.post(baseURL, body).then(memesCallBack).catch(errCallback)
const deleteMemes= id => axios.delete(`${baseURL}/${id}`).then(memesCallBack).catch(errCallback)
const updateMemes = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(memesCallBack).catch(errCallback)

function submitHandler(e) {
e.preventDefault()
let title = document.querySelector('#title')
let rating = document.querySelector('input[name="ratings"]:checked')
let imageURL = document.querySelector('#img')

let bodyObj ={
 title: title.value,
 rating: rating.value,
 imageURL: imageURL.value
}

createMemes(bodyObj)
title.value = ''
rating.checked = false
imageURL.value = ''
}

function createMemeCard(memes){
const memeCard = document.createElement('div')
memeCard.classList.add('meme-card')

memeCard.innerHTML = `<img alt='meme cover src=${memes.imageURL} class="meme-cover"/>
<p class="meme-title">${memes.title}</p>
<div class="btns-container">
<button onclick="updateMemes(${memes.id}, 'minus')">-</button>
<p class="memes-rating">${memes.rating} stars</p>
<button onclick="updateMemes(${memes.id}, 'plus')">+</button>
</div>
<button onclick="deleteMemes(${memes.id})">delete</button>
` 

memesContainer.appendChild(memeCard)
}

function displayMemes(arr){
memesContainer.innerHTML = ``
for(let i = 0; i< arr.length; i++){
    createMemeCard(arr[i])
 }
}

form.addEventListener('submit', submitHandler)
getAllMemes()
