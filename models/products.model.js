const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: ''
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tags'
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    default: 'ACTIVE'
  }
}, {
  timestamps: true
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model('products', productSchema)

module.exports = productModel
