const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'DELETED'],
    default: 'ACTIVE'
  }
}, {
  timestamps: true
})

categorySchema.plugin(mongoosePaginate)
const categoryModel = mongoose.model('categories', categorySchema)

module.exports = categoryModel
