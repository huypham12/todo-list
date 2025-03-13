const TodoList = require('../models/todo.js')

module.exports.ToDoList = async (req, res) => {
  const Todo = await TodoList.find()

  res.render('pages/index.pug',
    {
      pageTitle: 'Todo List',
      tasks: Todo
    }
  )
}

module.exports.AddTask = async (req, res) => {
  res.render('pages/add-task.pug')
}

module.exports.Create = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body
    const newTask = new TodoList({ title, description, dueDate, priority })

    await newTask.save()
    res.redirect('/todo-list')
  } catch {
    console.log('thêm thất bại')
  }
}


// GET render ra giao diện để người dùng nhập thông tin chỉnh sửa
module.exports.Edit = async (req, res) => {
  try {
    const task = await TodoList.findById(req.params.id); // Lấy document duy nhất
    console.log(task)
    console.log(task.tags)
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.render('pages/edit-task.pug', { task });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// PATCH
module.exports.EditTask = async (req, res) => {
  const id = req.params.id
  const { title, description, dueDate, priority } = req.body

  await TodoList.updateOne(
    { _id: id },
    {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    }
  )

  res.redirect("/todo-list");
}


// PATCH completed

module.exports.Completed = async (req, res) => {
  const id = req.params.id
  await TodoList.updateOne({_id: id}, {status: 'completed'})
  res.redirect('/todo-list')
}

// DELETE
module.exports.Delete = async (req, res) => {
  const id = req.params.id
  await TodoList.deleteOne({_id: id})
  res.redirect('/todo-list')
}