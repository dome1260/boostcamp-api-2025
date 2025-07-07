const express = require('express')
const multer = require('multer')
const router = express.Router()

const uploadController = require('../controllers/upload.controller')

const upload = new multer({
  storage: multer.memoryStorage()
})

router.post('/', upload.single('file'), uploadController.handleUploadFile)

module.exports = router
