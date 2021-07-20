const Priority = require("../models/Priority");

module.exports.getPriorities = async function(req, res) {
   try {const priorities = await Priority.find().sort({order: 1});
   res.status(200).json(priorities)}
   catch {
       errorHandler(res, e)
   }
}
module.exports.upDatePriority = async function(req, res) {
    try {
        const priority = await Priority.findOneAndUpdate(
            {_id: req.params.id},
            {$set : req.body},
            {new : true}
            )
    res.status(200).json(priority)
}
    catch {
        errorHandler(res, e)
    }
  }  

module.exports.createPriority = async function(req, res) { 
          
     const priority = new Priority ({
         name: req.body.name,
         order: req.body.order,
         custom: req.body.custom
     })
     try {        
         await priority.save();         
         res.status(201).json(priority)
     } catch(e) {
         console.log(e)
         errorHandler(res, e)
     }
}
module.exports.removePriority = async function(req, res) {
    try {
        console.log(req.params)
        const priority = await Priority.findById(req.params.id)
        await priority.remove()
        res.status(200).json({message : "column is removed"})
        }
    catch {
        console.log(error)
       // errorHandler(res, e)
    }
  }
  module.exports.getPriorityById = async function(req, res) {
    try {
        const priority = await Priority.findById(req.params.id)        
        res.status(200).json(priority)
        }
    catch {
        errorHandler(res, e)
    }
}  


