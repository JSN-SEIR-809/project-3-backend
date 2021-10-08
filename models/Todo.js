const mongoose = require('../db/connection');

const todoSchema = new mongoose.Schema(

    {
       date: String,
       dueDate: String,
       user: String,
       content: String,
       priority: String,
       completed: Boolean,
       Todoer: { type: mongoose.Schema.Types.ObjectId, ref:"User"}
       

    }

);

module.exports = mongoose.model('Todo', todoSchema);