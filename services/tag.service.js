const tagModel = require('../models/tag.model')

const tagService = {
  getPaginate (query, options) {
    return tagModel.paginate(query, options)
  },

  getAll (query) {
    return tagModel.find(query)
  },

  getOne (query) {
    return tagModel.findOne(query)
  },

  getById (id, query) {
    return tagModel.findOne({
      _id: id,
      ...query
    })
  },

  create (payload) {
    return tagModel(payload).save()
  },

  updateById (id, query, payload) {
    return tagModel.findOneAndUpdate(
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
    return tagModel.findOneAndUpdate(
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

module.exports = tagService
