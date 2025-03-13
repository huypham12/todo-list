const todoRoutes = require('./todo.routes.js')
const express = require('express')
const app = express()

module.exports = (app) => {
  app.use('/todo-list', todoRoutes)
}