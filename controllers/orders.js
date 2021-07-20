const Order = require("../models/Order");

module.exports.geOrders = async function(req, res) {
   try {const orders = await Order.find(req.query).sort({order: 1});
   res.status(200).json(orders)}
   catch {
       errorHandler(res, e)
   }
}
module.exports.geOrderById = async function(req, res) {
    try {const order = await Order.findById(req.params.id);
    res.status(200).json(order)}
    catch {
        errorHandler(res, e)
    }
 }
//  module.exports.geOrderByName = async function(req, res) {
//     try {const order = await Order.findOne({name : req.body.name});
//     res.status(200).json(order)}
//     catch {
//         errorHandler(res, e)
//     }
//  }



