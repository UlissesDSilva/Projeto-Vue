const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send('Informe usuário e senha')
    }

    const user = await app.db('users')
      .where({email: req.body.email})
      .first()

    if (!user) {
      return res.status(401).send('Usuário não encontrado')
    }
    
    const isMatch = bcrypt.compareSync(req.body.password, user.password)
    
    if (!isMatch) {
      return res.status(401).send('Email/Senha inválidos')
    }

    const dateCurrent =  Math.floor(Date.now() / 1000)

    const payload = {
      name: user.name,
      email: user.email,
      admin: user.admin,
      iat: dateCurrent,
      exp: dateCurrent + (60 * 60 * 24 * 3)
    }
    //(seg, min, hours, day)

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret)
    })
  }

  const validationToken = app => {
    const userData = req.body || null

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret)

        if (new Date(token.exp * 1000) > new Date()) {
          //Opção: Renovar o token, caso esteja perto de expirar
          return res.send(true)
        }
      }
    } catch (e) {
      //ToDo
    }

    res.send(false)
  }

  return { signin, validationToken }
}