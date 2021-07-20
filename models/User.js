const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        require: false,
        unique: false
    }
   
})

module.exports = mongoose.model('users', userSchema)