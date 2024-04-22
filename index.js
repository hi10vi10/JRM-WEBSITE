const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const Note = require('./models/Note')
// const { default: mongoose } = require('mongoose')
const app = express()
app.use(express.json({ extended: true }))
app.use(express.urlencoded())
const port = 3000

mongoose.connect('mongodb+srv://phaxtont:VmqY4XN7IE1JWDh5@cluster0.eyp4bz7.mongodb.net/', function(error) {
    if (!error) {
        console.log("Successfully Connected")
    }
});

app.get('/login', (req, res) => {
    res.sendFile("pages/login.html", { root: __dirname })
})
app.get('/about', (req, res) => {
    res.sendFile("pages/about.html", { root: __dirname })
})
app.get('/signup', (req, res) => {
    res.sendFile("pages/signup.html", { root: __dirname })
})

app.get('/', (req, res) => {
    res.sendFile("pages/index.html", { root: __dirname })
})

//end points serve APIs
app.post('/getnotes', async (req, res) => {
    let notes =await Note.find({email:req.body.email})
    res.status(200).json({success: true, notes})
})

app.post('/login', async (req, res) => {
    // console.log(user)
    let user =await User.findOne(req.body)
    if(!user){
        res.status(200).json({success: false, message: "No user found"})
    }
    else{
        res.status(200).json({success: true, user: {email: user.email}, message: "User found"})
    }
})

app.post('/signup', async (req, res) => {
    const {userToken } = req.body
    console.log(req.body)
    let user = await User.create(req.body)
    res.status(200).json({success:true, user: user})
})

app.post('/addnote', async(req, res) => {
    const { userToken } = req.body
    let note = await Note.create(req.body)
    res.status(200).json({success:true, note})
})

app.post('/delete-note', async (req, res) => {
    let noted = await Note.deleteOne(req.body)
    res.status(200).json({success:true, noted})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());