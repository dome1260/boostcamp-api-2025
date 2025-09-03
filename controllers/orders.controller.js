const mongoose = require('mongoose')
const orderService = require('../services/orders.service')

const orderController = {
  async getOrderByPaginate(req, res) {
    try {
      const options = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort: { createdAt: -1 }
      }

      const orders = await orderService.getPaginate(
        { status: { $ne: 'DELETED' } },
        options
      )

      return res.status(200).json({
        message: 'success',
        data: orders
      })
    } catch (error) {
      console.error('[ERROR] get order by paginate', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async getOrderById(req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)

      const order = await orderService.getById(objectId, {
        status: { $ne: 'DELETED' }
      })

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        })
      }

      return res.status(200).json({
        message: 'success',
        data: order
      })
    } catch (error) {
      console.error('[ERROR] get order by id', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async createOrder(req, res) {
    try {
      const { orderNo, customer, orderItems, totalAmount } = req.body

      if (!orderNo || !customer || !orderItems.length || !totalAmount) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        })
      }
      
      const duplicateOrder = await orderService.getOne({
        orderNo,
        status: { $ne: 'DELETED' }
      })

      if (duplicateOrder) {
        return res.status(400).json({
          success: false,
          message: 'Order already exists'
        })
      }

      const itemsWithObjectId = orderItems.map(item => ({
        ...item,
        product: new mongoose.Types.ObjectId(`${item.product}`)
      }))

      const createdOrder = await orderService.create({
        ...req.body,
        orderItems: itemsWithObjectId
      })

      return res.status(201).json({
        message: 'success',
        data: createdOrder
      })
    } catch (error) {
      console.error('[ERROR] create order', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async updateOrder(req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const order = await orderService.getById(objectId, { status: { $ne: 'DELETED' } })

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        })
      }

      const { orderItems } = req.body

      const itemsWithObjectId = orderItems.map(item => ({
        ...item,
        product: new mongoose.Types.ObjectId(`${item.product}`)
      }))

      const updated = await orderService.updateById(
        objectId,
        { status: { $ne: 'DELETED' } },
        { 
          ...req.body,
          orderItems: itemsWithObjectId 
        }
      )

      return res.status(200).json({
        message: 'success',
        data: updated
      })
    } catch (error) {
      console.error('[ERROR] update order', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  },

  async deleteOrder(req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const order = await orderService.getById(objectId, { status: { $ne: 'DELETED' } })

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        })
      }

      const deleted = await orderService.deleteById(objectId, { status: { $ne: 'DELETED' } })

      return res.status(200).json({
        message: 'success',
        data: deleted
      })
    } catch (error) {
      console.error('[ERROR] delete order', error?.message || error)
      return res.status(500).json({
        success: false,
        message: error?.message || error
      })
    }
  }
}

module.exports = orderController
