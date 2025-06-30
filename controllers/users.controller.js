const mongoose = require('mongoose')
const userService = require('../services/users.service')

const userController = {
  async getAllUsers (req, res) {
    try {
      const users = await userService.getAll({
        status: 'ACTIVE'
      })

      return res.status(200).json({
        success: true,
        data: users
      })
    } catch (error) {
      console.error('[ERROR] get all users', error)
      return res.status(500).json({
        success: false,
        message: error
      })
    }
  },

  async createUsers (req, res) {
    try {
      const created = await userService.create(req.body)

      return res.status(201).json({
        success: true,
        data: created
      })
    } catch (error) {
      console.error('[ERROR] create users', error)
      return res.status(500).json({
        success: false,
        message: error
      })
    }
  },

  async updateUsers (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const user = await userService.getById(
        objectId,
        {
          status: 'ACTIVE'
        }
      )

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      const updated = await userService.updateById(
        objectId,
        {
          status: 'ACTIVE'
        },
        req.body
      )

      return res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error('[ERROR] update users', error)
      return res.status(500).json({
        success: false,
        message: error
      })
    }
  },

  async deleteUsers (req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(`${req.params.id}`)
      const user = await userService.getById(
        objectId,
        {
          status: 'ACTIVE'
        }
      )

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      const deleted = await userService.deleteById(
        objectId,
        {
          status: 'ACTIVE'
        }
      )

      return res.status(200).json({
        success: true,
        data: deleted
      })
    } catch (error) {
      console.error('[ERROR] delete users', error)
      return res.status(500).json({
        success: false,
        message: error
      })
    }
  }
}

module.exports = userController
