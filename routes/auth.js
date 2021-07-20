const express = require('express');
const router = express.Router();
const controllerAuth = require('../controllers/auth')

router.post('/login', controllerAuth.login)
router.post('/register', controllerAuth.register)

module.exports = router