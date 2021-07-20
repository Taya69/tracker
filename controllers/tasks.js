const Task = require("../models/Task")
const upload = require('../midleware/upload')
const fs = require('fs')
const config = require('../config/keys')

module.exports.getTasks = async function(req, res) {
   try {
       let tasks = []
       if (req.query.sort === 'by order') {           
        tasks = await Task.find(
            {priority : req.query.priority}
        ).sort({orderOrder : 1}) 
       } else {
           if (req.query.sort === 'by name') {
            tasks = await Task.find(
                {priority : req.query.priority}
            ).sort({name : 1}) 
           } else {
               console.log(req.query.priority)
            tasks = await Task.find(
                {priority : req.query.priority})
           }
       }   
   res.status(200).json(tasks)}
   catch {
       errorHandler(res, e)
   }
}
module.exports.getTasksById = async function(req, res) {
    try {
        const task = await Task.findById(req.params.id)        
        res.status(200).json(task)
        }
    catch {
        errorHandler(res, e)
    }
}
module.exports.removeTask = async function(req, res) {
    try {
        const task = await Task.findById(req.params.id)
        await task.remove()
        res.status(200).json({message : "task is removed"})
        }
    catch {
        errorHandler(res, e)
    }
  }
  module.exports.upDateTask = async function(req, res) {
    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id},
            {$set : req.body},
            {new : true}
            )
    res.status(200).json(task)
}
    catch {
        errorHandler(res, e)
    }
  }  

module.exports.createTask = async function(req, res) { 
    console.log(req.body.orderOder)       
     const task = new Task ({
         name: req.body.name,
         description: req.body.description,
         dateOfCreate: req.body.dateOfCreate,
         dateDeadline : req.body.dateDeadline,
         fileSrc: req.body.fileSrc,
         orderOrder: req.body.orderOrder,
         orderName: req.body.orderName,
         //user: req.user.id,
         priority: req.body.priority
     })
     try {
         await task.save();
         res.status(201).json(task)
     } catch(e) {
         errorHandler(res, e)
     }
}
module.exports.addFile = function(req, res) {        
        upload(req, res, (err) => {
                  if(err){
                      res.status(500).json({
                          message: "error"
                      })                 
                  } else {
                    if(req.file == undefined){                        
                        res.status(200).json(
                           {message : "file is undefined"} 
                        )                   
                    } else {
                        let filedata = req.file;                                              
                        res.status(200).json(
                            `${filedata.path}`
                        )                 
                    }
                  }
                });         
    }
 
module.exports.download = function download(req, res) {
     
    const dest = config.filePath +"\\"+ req.query.file  
  try {    
    if (fs.existsSync(dest)) {       
        return res.download(dest, 'test')
    }    
    return res.status(400).json({message: "Download error"})
  }
  catch(e) {
    console.log(e)
    res.status(500).json({message: "Download error"})
  }
    }

 