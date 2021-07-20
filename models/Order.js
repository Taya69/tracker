const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const orderSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },    
    order: {
        type: Number,
        require: true
    }      
})

module.exports = mongoose.model('orders', orderSchema)