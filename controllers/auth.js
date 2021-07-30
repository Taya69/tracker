const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {  
    const candidate = await User.findOne({email: req.body.email})
    console.log(candidate)
    if (candidate) {    
        let passwordResult = bcrypt.compareSync(req.body.password, candidate.password) || req.body.password === candidate.password ? true : false
        if (passwordResult) {        
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(201).json(`Bearer ${token}`)
        } else{
            res.status(401).json({
                message: "you entered unvalid password"
            })
        }
    } else {    
        res.status(401).json({
            message: "that user is not found"
        })
    }
}

module.exports.register = async function(req, res) {
   const candidate = await User.findOne({
       email: req.body.email
   })
   if (candidate) {
       res.status(409).json({
           message: "that email is occupied"
       })
   } else {
       const salt = bcrypt.genSaltSync(10)
       const password = req.body.password
    const user = new User ({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
        code: ''
    })    
    try {
        await user.save();
        res.status(201).json(user)
    } catch(e) {
        errorHandler(res, e)
    }    
   }    
}