const routerTodo = require('./routes/index.routes.js')
require('dotenv').config();
const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT

// cấu hình sử dụng pug trong views
app.set('view engine', 'pug')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

routerTodo(app)



app.listen(port, ()=>{
  console.log(`App listening on port ${3000}`)
})