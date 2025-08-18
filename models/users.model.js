const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'SALES'],
    default: 'SALES'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    default: 'ACTIVE'
  }
}, {
  timestamps: true
})

userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model('users', userSchema)

module.exports = userModel
