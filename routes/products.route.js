const express = require('express')
const router = express.Router()

const productController = require('../controllers/products.controller')
const { adminGuard } = require('../middlewares/admin-guard')

router.get('/', productController.getProductByPaginate)
router.get('/:id', productController.getProductById)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
