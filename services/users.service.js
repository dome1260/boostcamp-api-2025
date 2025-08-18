const userModel = require('../models/users.model')

const userService = {
  getAll (query) {
    return userModel.find(query)
  },

  getOne (query) {
    return userModel.findOne(query)
  },

  getById (id, query) {
    return userModel.findOne({
      _id: id,
      ...query
    })
  },

  getPaginate (query, options) {
    return userModel.paginate(query, options)
  },

  create (payload) {
    return userModel(payload).save()
  },

  updateById (id, query, payload) {
    return userModel.findOneAndUpdate(
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
    return userModel.findOneAndUpdate(
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

module.exports = userService
