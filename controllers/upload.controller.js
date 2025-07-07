const { Storage } = require('@google-cloud/storage')

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)

const storage = new Storage({
  projectId: 'web-service-1260',
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key
  }
})

const bucketName = 'cloud-storage-1260'
const bucket = storage.bucket(bucketName)

const uploadController = {
  async handleUploadFile (req, res) {
    try {
      const file = req.file
      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'File is invalid'
        })
      }
      const fileName = `${file.originalname}_${Date.now()}`
      const blob = bucket.file(fileName)
      const blobStream = await blob.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      })
      blobStream
        .on('finish', () => {
          return res.status(200).json({
            success: true,
            data: {
              publicUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`,
              name: file.originalname
            }
          })
        })
        .on('error', (error) => {
          console.error('[ERROR] blob stream', error?.message || error)
          return res.status(500).json({
            success: false,
            message: error?.message || error
          })
        })
        .end(file.buffer)
    } catch (error) {
      console.error('[ERROR] handle upload file', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  }
}

module.exports = uploadController
