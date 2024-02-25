const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    brand: String,
    rating: Number,
    model: String,
    price: Number,
    speed: Number,
    gps: String,
    seatType: String,
    carType: String,
    desc: String

})

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel