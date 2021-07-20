const express = require('express');
const router = express.Router();
const controllerTasks = require('../controllers/tasks')


router.post('/', controllerTasks.addFile)
router.get('/', controllerTasks.download)

module.exports = router