const mongoose = require("mongoose")
const { Schema } = mongoose

const Admin = new Schema({
    password: String
})

mongoose.model("admin", Admin, "admin")