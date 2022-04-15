const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.



const{getAComp,getAFortune,getMemes,deleteMemes,createMeme,updateMemes}=require('./controller.js')
app.get("/api/compliment",getAComp);
app.get("/api/fortune",getAFortune);
app.get("/api/memes",getMemes);
app.post("/api/memes",createMeme)
app.delete("/api/memes/:id",deleteMemes)
app.put("/api/memes/:id",updateMemes)




app.listen(4000, () => console.log("Server running on 4000"));
