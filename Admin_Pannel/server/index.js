const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require('cors')
const UserModel = require('./models/Users')
const upload = multer({ dest: 'uploads/' });

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
    UserModel.findByIdAndUpdate({_id:id},{name:req.body.name,brand:req.body.brand,rating:req.body.rating,model:req.body.model,price:req.body.price,speed:req.body.speed,gps:req.body.gps,seatType:req.body.seatType,carType:req.body.carType,desc:req.body.desc,image:req.body.image})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err =>res.json(err))
})

// app.post("/createUser",(req,res)=>{
//     UserModel.create(req.body)
//     .then(users=>res.json(users))
//     .catch(err=>res.json(err))
// })
app.post('/createUser', upload.single('image'), (req, res) => {
    // Process the uploaded file or data here
    const { name, brand, rating, model, price, speed, gps, seatType, carType, desc } = req.body;
    const image = req.file ? req.file.path : null;

    // Create new user with uploaded data
    UserModel.create({ name, brand, rating, model, price, speed, gps, seatType, carType, desc, image })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: 'Error creating user', message: err.message }));
});



app.listen(3000, () => {
console.log("Server is Running")
})

