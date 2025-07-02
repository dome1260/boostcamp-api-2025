const bcrypt = require('bcrypt')
const userService = require('../services/users.service')
const { createToken, decodeToken } = require('../utils/jwt.config')

const authController = {
  async login (req, res) {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(401).json({
          success: false,
          message: 'username and password is required'
        })
      }

      const user = await userService.getOne({
        username: req.body.username,
        status: 'ACTIVE'
      })

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'username is incorrect'
        })
      }

      const checkPassword = await bcrypt.compare(req.body.password, user.password)
      if (!checkPassword) {
        return res.status(401).json({
          success: false,
          message: 'password is incorrect'
        })
      }

      const jwtPayload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role
      }

      const accessToken = createToken(jwtPayload)
      const decoded = decodeToken(accessToken)

      return res.status(200).json({
        success: true,
        data: {
          accessToken,
          expiresIn: decoded.exp,
          user: jwtPayload
        }
      })

    } catch (error) {
      console.error('[ERROR] login', error)
      return res.status(500).json({
        success: false,
        message: error
      })
    }
  }
}

module.exports = authController
