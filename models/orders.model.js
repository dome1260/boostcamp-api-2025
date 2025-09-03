const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const customerSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  }
}, {
  _id: false
})

const orderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  _id: false
})

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: customerSchema,
    required: true
  },
  orderItems: {
    type: [orderItemsSchema],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: [
      'PENDING',
      'PENDING_SHIPPED',
      'SHIPPED',
      'CANCELLED',
      'FINISHED',
      'DELETED'
    ],
    default: 'PENDING'
  }
}, {
  timestamps: true
})

orderSchema.plugin(mongoosePaginate)
const orderModel = mongoose.model('orders', orderSchema)

module.exports = orderModel
