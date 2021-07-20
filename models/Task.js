const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const taskSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: false
    }, 
    description: {
        type: String,
        require: true,
        unique: false
    }, 
    dateOfCreate: {
        type: Date,        
        unique: false
    }, 
    dateDeadline: {
        type: Date,        
        unique: false
    },
    orderOrder: {       
        type: Number,
        require: false,        
        unique: false
    },
    orderName: {
        type: String,
        require: false,
        unique: false
    },  
    priority: {       
        type: String,
        require: true,        
        unique: false
    },   
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        require: false,        
        unique: false
    },  
    file: {
        type : [String]        
    }   
   
})

module.exports = mongoose.model('tasks', taskSchema)