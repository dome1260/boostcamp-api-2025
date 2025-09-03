const orderModel = require('../models/orders.model')

const orderService = {
  getPaginate (query, options) {
    return orderModel.paginate(query, {
      ...options,
      populate: ['orderItems.product'],
      sort: { createdAt: -1 }
    })
  },

  getAll (query) {
    return orderModel.find(query).populate('orderItems.product')
  },

  getOne (query) {
    return orderModel.findOne(query).populate('orderItems.product')
  },

  getById (id, query) {
    return orderModel.findOne({
      _id: id,
      ...query
    }).populate('orderItems.product')
  },

  create (payload) {
    return orderModel(payload).save()
  },

  updateById (id, query, payload) {
    return orderModel.findOneAndUpdate(
      {
        _id: id,
        ...query
      },
      {
        $set: payload
      },
      {
        new: true
      }
    ).populate('orderItems.product')
  },

  deleteById (id, query) {
    return orderModel.findOneAndUpdate(
      {
        _id: id,
        ...query
      },
      {
        $set: {
          status: 'DELETED'
        }
      },
      {
        new: true
      }
    ).populate('orderItems.product')
  }
}

module.exports = orderService
