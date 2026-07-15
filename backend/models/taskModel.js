const mongoose = require('mongoose')

const Taskschema = mongoose.Schema({
    id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {type : String , required: true ,},
    completed: {type : Boolean , default: false},
})

const Task = mongoose.model("Task" , Taskschema)
module.exports = Task