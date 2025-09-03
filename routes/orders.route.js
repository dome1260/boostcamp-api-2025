const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orders.controller')
const { adminGuard } = require('../middlewares/admin-guard')

router.get('/', orderController.getOrderByPaginate)
router.get('/:id', adminGuard, orderController.getOrderById)
router.post('/', adminGuard, orderController.createOrder)
router.put('/:id', adminGuard, orderController.updateOrder)
router.delete('/:id', adminGuard, orderController.deleteOrder)

module.exports = router
