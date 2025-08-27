const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const tagSchema = new mongoose.Schema({
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

tagSchema.plugin(mongoosePaginate)
const tagModel = mongoose.model('tags', tagSchema)

module.exports = tagModel
