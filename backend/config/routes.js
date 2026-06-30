const checkAdmin = require('./checkAdmin.js')

module.exports = app => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validate', app.api.auth.validationToken)

  app.route('/users')
    .all(app.config.passport.authenticate())
    .post(checkAdmin(app.api.user.save))
    .get(checkAdmin(app.api.user.getAll))
  
  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(checkAdmin(app.api.user.save))
    .get(app.api.user.getById)
    .delete(checkAdmin(app.api.user.remove))

  app.route('/categories')
    .all(app.config.passport.authenticate())
    .post(checkAdmin(app.api.category.save))
    .get(app.api.category.getAll)

  app.route('/categories/tree')
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree)

  app.route('/categories/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(checkAdmin(app.api.category.save))
    .delete(checkAdmin(app.api.category.remove))

  app.route('/articles')
    .all(app.config.passport.authenticate())
    .post(checkAdmin(app.api.article.save))
    .get(app.api.article.getAll)
  
  app.route('/articles/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(checkAdmin(app.api.article.save))
    .delete(checkAdmin(app.api.article.remove))

  app.route('/categories/:id/articles')
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory)
}