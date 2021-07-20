const express = require('express');
const router = express.Router();
const controllerPriorities = require('../controllers/priorities')


router.get('/', controllerPriorities.getPriorities)
router.post('/', controllerPriorities.createPriority)
router.patch('/:id', controllerPriorities.upDatePriority)
router.delete('/:id', controllerPriorities.removePriority)
router.get('/:id', controllerPriorities.getPriorityById)


module.exports = router