const mongoose = require('mongoose')
const { Schema } = mongoose

const testData = new Schema({
    name: String,
    birthdate: String,
    testdate: String,
})


mongoose.model("testdata", testData)