const jwt = require('jsonwebtoken')
const secretKey = 'kalSLdome120z_.(0/'

const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '7d' })
}

const decodeToken = (token) => {
  return jwt.decode(token, secretKey)
}

module.exports = {
  createToken,
  decodeToken
}
