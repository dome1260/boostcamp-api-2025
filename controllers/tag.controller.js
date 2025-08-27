const mongoose = require('mongoose')
const tagService = require('../services/tag.service')

const tagController = {
  async getTagByPaginate (req, res) {
    try {
      const options = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort: { createdAt: -1}
      }

      const tags = await tagService.getPaginate({
        status: { $ne: 'DELETED' }
      }, options)

      return res.status(200).json({
        message: 'success',
        data: tags
      })
    } catch (error) {
      console.error('[ERROR] get tag by paginate', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async getTagById (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)

      const tag = await tagService.getOne({
        _id: objectId,
        status: { $ne: 'DELETED' }
      })

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: 'Tag not found'
        })
      }

      return res.status(200).json({
        message: 'success',
        data: tag
      })
    } catch (error) {
      console.error('[ERROR] get tag by id', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async createTag (req, res) {
    try {
      if ( !req.body.name) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        })
      }

      const duplicateName = await tagService.getOne({
        name: req.body.name,
        status: { $ne: 'DELETED' }
      })
      if (duplicateName) {
        return res.status(400).json({
          success: false,
          message: "Tag already exists"
        })
      }

      const created = await tagService.create(req.body)
      return res.status(201).json({
        message: 'success',
        data: created
      })
    } catch (error) {
      console.error('[ERROR] create tag', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async updateTag (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const tag = await tagService.getById(objectId, {
        status: 'ACTIVE'
      })

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: 'Tag not found'
        })
      }

      const updated = await tagService.updateById(
        objectId,
        {
          status: 'ACTIVE'
        },
        req.body
      )

      return res.status(200).json({
        message: 'success',
        data: updated
      })
    } catch (error) {
      console.error('[ERROR] update tag', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async deleteTag (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const tag = await tagService.getById(objectId, {
        status: 'ACTIVE'
      })

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: 'Tag not found'
        })
      }

      const deleted = await tagService.deleteById(
        objectId,
        {
          status: 'ACTIVE'
        }
      )

      return res.status(200).json({
        message: 'success',
        data: deleted
      })
    } catch (error) {
      console.error('[ERROR] delete tag', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  }
}

module.exports = tagController
