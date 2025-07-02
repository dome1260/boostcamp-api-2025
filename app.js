require('dotenv').config()
require('./utils/mongodb.config')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const userRoute = require('./routes/users.route')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoute)

app.get('/', (req, res) => {
  res.send('Welcome to server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
