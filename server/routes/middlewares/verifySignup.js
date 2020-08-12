const User = require('../../models/User')

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body
  try {
    const existingUserByName = await User.findOne({ username: username })
    if (existingUserByName) {
      res.status(400).send({ message: 'Failed! Username is already in use!' })
      return
    }
    const existingUserByEmail = await User.findOne({ email: email })
    if (existingUserByEmail) {
      res.status(400).send({ message: 'Failed! Email is already in use!' })
      return
    }
  } catch (err) {
    res.status(500).send({ message: err })
    return
  }
  next()
}
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
}

module.exports = verifySignUp
