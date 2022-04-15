const memes = require('./db.json')
let globalId = 1
module.exports={
getAComp: function(req,res){
const compliments = ["Gee, you're a smart cookie!",
"Cool shirt!",
"Your Javascript skills are stellar.",
];
let randomIndex = Math.floor(Math.random() * compliments.length);
let randomCompliment = compliments[randomIndex];
res.status(200).send(randomCompliment);
},
getAFortune: function(req,res){
const fortunes = ["Your gas prices will go down","Or will they","Just kidding they are going to go up"]
let randomIndex = Math.floor(Math.random() * fortunes.length);
let randomFortune = fortunes[randomIndex];
res.status(200).send(randomFortune);
},
getMemes: (req, res) => res.status(200).send(memes),

deleteMemes: (req, res) => {
    let index = memes.findIndex(elem => elem.id === +req.params.id)
    memes.splice(index, 1)
    res.status(200).send(memes)
},
createMeme: (req, res) => {
    let { title, rating, imageURL } = req.body
    let newMeme = {
        id: globalId,
        title, 
        rating,
        imageURL
    }
    memes.push(newMeme)
    res.status(200).send(memes)
    globalId++
},
updateMemes: (req, res) => {
    let { id } = req.params
    let { type } = req.body
    let index = memes.findIndex(elem => +elem.id === +id)

    if (memes[index].rating == 5 && type === 'plus') {
        res.status(400).send('you cannot go above 5')
    } else if (memes[index].rating === 0 && type === 'minus') {
        res.status(400).send('you cannot go below 0')
    } else if (type === 'plus') {
        memes[index].rating++
        res.status(200).send(memes)
    } else if (type === 'minus') {
        memes[index].rating--
        res.status(200).send(memes)
    } else {
        res.sendStatus(400)
    }
 }
}