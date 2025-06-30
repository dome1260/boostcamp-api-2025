const express = require('express')
const router = express.Router()

const userController = require('../controllers/users.controller')

router.get('/', userController.getAllUsers)
router.post('/', userController.createUsers)
router.put('/:id', userController.updateUsers)
router.delete('/:id', userController.deleteUsers)

module.exports = router
