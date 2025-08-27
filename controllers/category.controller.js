const mongoose = require('mongoose')
const categoryService = require('../services/category.service')

const categoryController = {
  async getCategoryByPaginate (req, res) {
    try {
      const options = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort: { createdAt: -1}
      }

      const categories = await categoryService.getPaginate({
        status: { $ne: 'DELETED' }
      }, options)

      return res.status(200).json({
        message: 'success',
        data: categories
      })
    } catch (error) {
      console.error('[ERROR] get category by paginate', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async getCategoryById (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)

      const category = await categoryService.getOne({
        _id: objectId,
        status: { $ne: 'DELETED' }
      })

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        })
      }

      return res.status(200).json({
        message: 'success',
        data: category
      })
    } catch (error) {
      console.error('[ERROR] get category by id', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async createCategory (req, res) {
    try {
      if ( !req.body.name) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        })
      }

      const duplicateName = await categoryService.getOne({
        name: req.body.name,
        status: { $ne: 'DELETED' }
      })
      if (duplicateName) {
        return res.status(400).json({
          success: false,
          message: "Category already exists"
        })
      }

      const created = await categoryService.create(req.body)
      return res.status(201).json({
        message: 'success',
        data: created
      })
    } catch (error) {
      console.error('[ERROR] create category', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async updateCategory (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const category = await categoryService.getById(objectId, {
        status: 'ACTIVE'
      })

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        })
      }

      const updated = await categoryService.updateById(
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
      console.error('[ERROR] update category', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async deleteCategory (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const category = await categoryService.getById(objectId, {
        status: 'ACTIVE'
      })

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        })
      }

      const deleted = await categoryService.deleteById(
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
      console.error('[ERROR] delete category', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  }
}

module.exports = categoryController
