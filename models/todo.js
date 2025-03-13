const mongoose = require('mongoose')
const mongo_uri = 'mongodb+srv://huypham:123@todo-db.whz9e.mongodb.net/'

const connect = async ()=>{
  try{
    await mongoose.connect(mongo_uri)
    console.log('kết nối thành công')
  } catch{
    console.log('kết nối thất bại')
  }
}
connect()

const todoSchema = new mongoose.Schema({

  // mỗi khóa đi kèm với một option object để thể hiện ràng buộc
  // chúng ta có thể tự tạo ra các validate để rằng buộc dữ liệu
  title: {
    type: String, // kiểu buộc phải là string
    required: true, // trường này bắt buộc phải có (giống như primary key trong sql)
    trim: true // xóa khoảng trắng thừa
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed'], // chỉ nhận hai giá trị này
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  tags: {
    type: [String],
    validate: {
      validator: function (tags) {
        return tags.every(tag => ['Học tập', 'Thể chất', 'Công việc'].includes(tag))
      },
      message: 'Tag không hợp lệ!'
    }
  }
})

// mongoose model giúp tương tác giữa db và code của node, hỗ trợ nhiều hàm để thao tác với collection todo-list trong MongoDB
// 'ModelName', schema, 'collectionName'
const TodoList = mongoose.model('TodoList', todoSchema, 'todo-list');
module.exports = TodoList

// dùng cái TodoList này để thực hiện crud cho dễ
