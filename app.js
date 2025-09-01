require('dotenv').config()
require('./utils/mongodb.config')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/users.route')
const uploadRoute = require('./routes/upload.route')
const tagRoute = require('./routes/tag.route')
const categoryRoute = require('./routes/category.route')
const productRoute = require('./routes/products.route')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/upload', uploadRoute)
app.use('/tags', tagRoute)
app.use('/categories', categoryRoute)
app.use('/products', productRoute)

app.get('/', (req, res) => {
  res.send('Welcome to server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
