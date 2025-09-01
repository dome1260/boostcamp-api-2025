const mongoose = require('mongoose')
const productService = require('../services/products.service')

const productController = {
  async getProductByPaginate(req, res) {
    try {
      const options = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort: { createdAt: -1 }
      }

      const products = await productService.getPaginate(
        { status: { $ne: 'DELETED' } },
        options
      )

      return res.status(200).json({
        message: 'success',
        data: products
      })
    } catch (error) {
      console.error('[ERROR] get product by paginate', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async getProductById(req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`) // String(req.params.id)

      const product = await productService.getById(objectId, {
        status: { $ne: 'DELETED' }
      })

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        })
      }

      return res.status(200).json({
        message: 'success',
        data: product
      })
    } catch (error) {
      console.error('[ERROR] get product by id', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async createProduct(req, res) {
    try {
      const { name, price, tags, category } = req.body

      if (!name || !price || !category) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        })
      }

      const tagsIds = tags.map(id => new mongoose.Types.ObjectId(`${id}`))
      const categoryId = new mongoose.Types.ObjectId(`${category}`)

      const duplicateName = await productService.getOne({
        name,
        status: { $ne: 'DELETED' }
      })
      if (duplicateName) {
        return res.status(400).json({
          success: false,
          message: 'Product already exists'
        })
      }

      const created = await productService.create({
        ...req.body,
        tags: tagsIds,
        category: categoryId
      })

      return res.status(201).json({
        message: 'success',
        data: created
      })
    } catch (error) {
      console.error('[ERROR] create product', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async updateProduct(req, res) {
    try {
      
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const product = await productService.getById(objectId, { status: 'ACTIVE' })

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        })
      }

      const { name, price, tags, category } = req.body

      if (!name || !price || !category) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        })
      }

      const tagsIds = tags.map(id => new mongoose.Types.ObjectId(`${id}`))
      const categoryId = new mongoose.Types.ObjectId(`${category}`)

      const updated = await productService.updateById(
        objectId, 
        { status: 'ACTIVE' }, 
        {
          ...req.body,
          tags: tagsIds,
          category: categoryId
        }
      )

      return res.status(200).json({
        message: 'success',
        data: updated
      })
    } catch (error) {
      console.error('[ERROR] update product', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async deleteProduct(req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const product = await productService.getById(objectId, { status: 'ACTIVE' })

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        })
      }

      const deleted = await productService.deleteById(objectId, { status: 'ACTIVE' })

      return res.status(200).json({
        message: 'success',
        data: deleted
      })
    } catch (error) {
      console.error('[ERROR] delete product', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  }
}

module.exports = productController
