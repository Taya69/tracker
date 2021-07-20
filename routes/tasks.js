const express = require('express');
const passport = require('passport')
const router = express.Router();
const controllerAuth = require('../controllers/tasks')
const jwt = require('jwt-simple');

router.get('/',controllerAuth.getTasks)
router.get('/:id', controllerAuth.getTasksById)
router.post('/', controllerAuth.createTask)
router.patch('/:id',controllerAuth.upDateTask)
router.delete('/:id',controllerAuth.removeTask)

module.exports = router