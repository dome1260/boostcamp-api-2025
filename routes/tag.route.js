const express = require('express')
const router = express.Router()

const tagController = require('../controllers/tag.controller')
const { adminGuard } = require('../middlewares/admin-guard')

router.get('/', adminGuard, tagController.getTagByPaginate)
router.get('/:id', adminGuard, tagController.getTagById)
router.post('/', adminGuard, tagController.createTag)
router.put('/:id', adminGuard, tagController.updateTag)
router.delete('/:id', adminGuard, tagController.deleteTag)

module.exports = router
