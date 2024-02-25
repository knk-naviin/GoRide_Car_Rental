const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://userdb:userdb1@mydb.svdyvj5.mongodb.net/")

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id',(req,res) =>{
    const id =req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const id= req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name:req.body.name,brand:req.body.brand,rating:req.body.rating,model:req.body.model,price:req.body.price,speed:req.body.speed,gps:req.body.gps,seatType:req.body.seatType,carType:req.body.carType,desc:req.body.desc})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err =>res.json(err))
})

app.post("/createUser",(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})


app.listen(3000, () => {
console.log("Server is Running")
})

