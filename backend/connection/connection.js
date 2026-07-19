require("dotenv").config();
const mongoose = require('mongoose')
const connection = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('mongodb atlas connected'))
    .catch((error) => console.log("MongoDB Connection Error:", error.message));
}
module.exports = connection