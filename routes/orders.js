const express = require('express');
const router = express.Router();
const controllerOrders = require('../controllers/orders')


router.get('/', controllerOrders.geOrders)

router.get('/:id', controllerOrders.geOrderById)

module.exports = router