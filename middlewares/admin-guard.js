const { decodeToken } = require('../utils/jwt.config')

const adminGuard = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1] || null
  const decoded = decodeToken(token)

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token unauthorized'
    })
  }
  if (token && decoded.exp <= Date.now() / 1000) {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    })
  }
  if (!['ADMIN'].includes(decoded.role)) {
    return res.status(403).json({
      success: false,
      message: 'Permission denied'
    })
  }

  next()
}

module.exports = {
  adminGuard
}
