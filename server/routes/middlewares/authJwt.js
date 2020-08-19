const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

const verifyToken = (req, res, next) => {
  //console.log(req.headers)
  let token = req.headers['x-access-token']
  //console.log('verify token', token)

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' })
    }
    req.userId = decoded.id
    next()
  })
}

const authJwt = {
  verifyToken,
}
module.exports = authJwt
