const bcrypt = require('bcrypt-nodejs')

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10)

  return bcrypt.hashSync(password, salt)
}