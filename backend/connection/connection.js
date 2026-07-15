const mongoose = require('mongoose')
const connection = ()=>{
    mongoose.connect("mongodb://localhost:27017/task")
    .then(()=>console.log('mongodb connected'))
}
module.exports = connection