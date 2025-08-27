const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category.controller')
const { adminGuard } = require('../middlewares/admin-guard')

router.get('/', adminGuard, categoryController.getCategoryByPaginate)
router.get('/:id', adminGuard, categoryController.getCategoryById)
router.post('/', adminGuard, categoryController.createCategory)
router.put('/:id', adminGuard, categoryController.updateCategory)
router.delete('/:id', adminGuard, categoryController.deleteCategory)

module.exports = router
