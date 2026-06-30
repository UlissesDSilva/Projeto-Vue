const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt =  require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    // Procura no cabeçario da requisição o token
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  // payload é o mesmo criado no signin
  const strategy = new Strategy(params, (payload, done) => {
    app.db('users')
      .where({email: payload.email})
      .first()
      .then(user => done(null, user ? { ...payload } : false))
      .catch(err => done(err, false))
  })

  passport.use(strategy)

  return {
    authenticate: () => passport.authenticate('jwt', {session: false})
  }
}