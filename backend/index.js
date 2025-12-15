import express from "express"
import consign from "consign"
import db from './config/db.js'

const app = express()

app.db = db

consign()
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

app.listen(3000, () => {
  console.log("Backend executando...!")
})