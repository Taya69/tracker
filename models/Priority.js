const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const prioritySchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },   
    custom: {
        type: Boolean,
        require: false        
    },
    order: {
        type: Number,
        require: true
    }      
})

module.exports = mongoose.model('priorities', prioritySchema)