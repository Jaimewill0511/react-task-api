const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema({
    text:{
        type: String,
        required: true,
      },
    day:{
        type: String,
        required: true,
      },
    reminder: Boolean
      
});
const Task = mongoose.model("Task", taskSchema)

module.exports = Task;