const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userService = require('../services/users.service')

const userController = {
  async getAllUsers (req, res) {
    try {
      const { page, limit } = req.query

      const users = await userService.getPaginate(
        {
          status: { $ne: 'DELETED' } // not equal
        },
        {
          page: Number(page),
          limit: Number(limit),
          sort: {
            createdAt: -1
          }
        }
      )

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
      if (
        !req.body.firstName
        || !req.body.lastName
        || !req.body.email
      ) {
        return res.status(400).json({
          success: false,
          message: 'First name, Last name and Email is required'
        })
      }

      const duplicateEmail = await userService.getOne({
        email: req.body.email,
        status: { $ne: 'DELETED' }
      })
      if (duplicateEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        })
      }

      const duplicateFullName = await userService.getOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: { $ne: 'DELETED' }
      })
      if (duplicateFullName) {
        return res.status(400).json({
          success: false,
          message: "This user name already exists.",
        })
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10)
      const created = await userService.create({
        ...req.body,
        password: hashPassword
      })

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
