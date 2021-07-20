const { ObjectId } = require("mongodb");
const { Schema} = require("mongoose");
const mongoose = require("mongoose")
const File = new Schema({
    name: {
        type: String,
        require: true        
    }, 
    type: {
        type: String,
        require: true    
    }, 
    accessLink: {
        type: String            
    }, 
    size: {
        type: Number,
        default: 0           
    },  
    path: {
        type: String,
        default: ''   
    },
    parent: {
        ref: 'File',
        type: Schema.Types.ObjectId,         
    },
    childs: {
        ref: 'File',
        type: Schema.Types.ObjectId,         
    },

})

module.exports = mongoose.model('File', File)