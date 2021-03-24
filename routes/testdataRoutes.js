const mongoose = require('mongoose');

const TestData = mongoose.model("testdata")


module.exports = app => {
    app.post("/api/testdata", (req, res, next) => {
        const { result } = req.body
        new TestData(result).save().then((savedData) => {
            res.send(savedData)
        }).catch(next)  // Errors will be passed to Express.
    })
}