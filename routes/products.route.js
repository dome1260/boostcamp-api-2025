const express = require('express')
const router = express.Router()

const productController = require('../controllers/products.controller')
const { adminGuard } = require('../middlewares/admin-guard')

router.get('/', adminGuard, productController.getProductByPaginate)
router.get('/:id', adminGuard, productController.getProductById)
router.post('/', adminGuard, productController.createProduct)
router.put('/:id', adminGuard, productController.updateProduct)
router.delete('/:id', adminGuard, productController.deleteProduct)

module.exports = router
