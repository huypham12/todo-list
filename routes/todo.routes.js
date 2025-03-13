const controller = require('../controller/todo.controller.js')
const express = require('express')
const router = express.Router()

router.get('/', controller.ToDoList)
router.get('/add-task', controller.AddTask)
router.post('/add', controller.Create)
router.get('/edit/:id', controller.Edit)
router.patch('/edit-task/:id', controller.EditTask )
router.patch('/complete/:id', controller.Completed)
router.delete('/delete/:id', controller.Delete)

module.exports = router