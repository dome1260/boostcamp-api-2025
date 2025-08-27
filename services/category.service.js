const categoryModel = require('../models/category.model')

const categoryService = {
  getPaginate (query, options) {
    return categoryModel.paginate(query, options)
  },

  getAll (query) {
    return categoryModel.find(query)
  },

  getOne (query) {
    return categoryModel.findOne(query)
  },

  getById (id, query) {
    return categoryModel.findOne({
      _id: id,
      ...query
    })
  },

  create (payload) {
    return categoryModel(payload).save()
  },

  updateById (id, query, payload) {
    return categoryModel.findOneAndUpdate(
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
    )
  },

  deleteById (id, query) {
    return categoryModel.findOneAndUpdate(
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

module.exports = categoryService
