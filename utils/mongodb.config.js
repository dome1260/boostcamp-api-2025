const mongoose = require('mongoose')

// เปลี่ยนใช้ลิงก์ mongodb uri ของตัวเองตอนเล่นได้เลยนะครับ
const uri = 'mongodb+srv://root:1234@cluster0.rd2mmob.mongodb.net/dev?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri).then(() => {
  console.log('Connect to database success')
}).catch((error) => {
  console.error('[ERROR] Connect to database failed :', error)
})
