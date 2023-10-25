const jwt = require('jsonwebtoken')

const signToken = (data) => {
  return jwt.sign(data, 'SecretKey')
}
const decodeToken = (token) => {
  return jwt.verify(token, 'SecretKey')
}

module.exports = {signToken, decodeToken}