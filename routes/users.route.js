const express = require('express')
const router = express.Router()

const userController = require('../controllers/users.controller')
const { adminGuard } = require('../middlewares/admin-guard')

router.get('/', adminGuard, userController.getAllUsers)
router.get('/:id', adminGuard, userController.getUserById)
router.post('/', adminGuard, userController.createUsers)
router.put('/:id', adminGuard, userController.updateUsers)
router.delete('/:id', adminGuard, userController.deleteUsers)

module.exports = router
