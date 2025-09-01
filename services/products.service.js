const productModel = require('../models/products.model')

const productService = {
  getPaginate(query, options) {
    return productModel.paginate(query, {
      ...options,
      populate: ['tags', 'category'],
      sort: { createdAt: -1 }
    })
  },

  getAll(query) {
    return productModel.find(query).populate('tags category')
  },

  getOne(query) {
    return productModel.findOne(query).populate('tags category')
  },

  getById(id, query) {
    return productModel.findOne({
      _id: id,
      ...query
    }).populate('tags category')
  },

  create(payload) {
    return productModel(payload).save()
  },

  updateById(id, query, payload) {
    return productModel.findOneAndUpdate(
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
    ).populate('tags category')
  },

  deleteById(id, query) {
    return productModel.findOneAndUpdate(
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
    )
  }
}

module.exports = productService
