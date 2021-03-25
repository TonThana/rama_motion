const mongoose = require('mongoose');

const TestData = mongoose.model("testdata")


module.exports = app => {
    app.post("/api/testdata", (req, res, next) => {
        const testData = req.body
        testData['servertimestamp'] = new Date()
        new TestData(testData).save().then(() => {
            res.send({ ok: true })
        }).catch(next)  // Errors will be passed to Express.
    })
    // test this
}