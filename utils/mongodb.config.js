const mongoose = require('mongoose')

// เปลี่ยนใช้ลิงก์ mongodb uri ของตัวเองตอนเล่นได้เลยนะครับ
const uri = process.env.MONGO_DB_URI

mongoose.connect(uri).then(() => {
  console.log('Connect to database success')
}).catch((error) => {
  console.error('[ERROR] Connect to database failed :', error)
})
